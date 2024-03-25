package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
	global "paintApp/glob"
	"paintApp/models"
)

// getPaintInventory retrieves all paint inventory items from the database
// Returns a slice of Paint structs and an error if the retrieval fails
func getPaintInventory() ([]models.Paint, error) {
	collection := global.MdbClient.Database(global.DbName).Collection("inventory")
	var paints []models.Paint
	filter := bson.D{{"item", "paint"}}
	paintCursor, err := collection.Find(context.TODO(), filter)
	err = paintCursor.All(context.Background(), &paints)
	return paints, err
}

// updatePaintInventoryStockType updates the stockType field of a paint inventory item
// with the given paintID to the newStockType string
// Returns an error if the update fails or nil if successful
func updatePaintInventoryStockType(paintID primitive.ObjectID, newStockType string) error {
	collection := global.MdbClient.Database(global.DbName).Collection("inventory")
	filter := bson.D{{"_id", paintID}}
	update := bson.D{{"$set", bson.D{{"stockType", newStockType}}}}

	_, err := collection.UpdateOne(context.TODO(), filter, update)
	return err
}

// updatePaintInventoryQuantity updates the quantity field of a paint inventory item
// specified by the paintID to the newQuantity int
// Returns an error if the update fails or nil if successful
func updatePaintInventoryQuantity(paintID primitive.ObjectID, newQuantity int) error {
	collection := global.MdbClient.Database(global.DbName).Collection("inventory")
	filter := bson.D{{"_id", paintID}}
	update := bson.D{{"$set", bson.D{{"quantity", newQuantity}}}}

	_, err := collection.UpdateOne(context.TODO(), filter, update)
	return err
}

// createPaint creates a new paint inventory item in the database
// specified by the given NewPaint struct
// Returns the ObjectID of the newly created item and an error if the creation fails
func createPaint(paint models.NewPaint) (primitive.ObjectID, error) {
	collection := global.MdbClient.Database(global.DbName).Collection("inventory")
	result, err := collection.InsertOne(context.Background(), paint)
	return result.InsertedID.(primitive.ObjectID), err
}

// createUser creates a new user in the database specified by the given NewUser struct
// Returns an error if the creation fails or nil if successful
func deleteInventoryItem(itemID primitive.ObjectID) error {
	collection := global.MdbClient.Database(global.DbName).Collection("inventory")
	filter := bson.D{{"_id", itemID}}
	_, err := collection.DeleteOne(context.Background(), filter)
	return err
}

// Inventory handles requests to the /data endpoint via GET requests
func Inventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// Retrieve session
	session, err := store.Get(r, "bcpaint-session")
	if err != nil {
		http.Error(w, "Failed to get session", http.StatusInternalServerError)
		return
	}

	// Retrieve username from the session
	uname, ok := session.Values["username"].(string)
	if !ok {
		http.Error(w, "Invalid session", http.StatusUnauthorized)
		return
	}

	// Handle user data request
	query := r.URL.Query()
	if query.Has("user") {
		userInfo, err := getUserInfo(uname)
		if err != nil {
			http.Error(w, "Failed to get user info", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(userInfo)
		return
	}

	if query.Has("inventory") {
		paintInv, err := getPaintInventory()
		if err != nil {
			http.Error(w, "Failed to get user info", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(paintInv)
		return
	}

	if query.Has("users") {
		//Ensure user has admin perms
		userInfo, err := getUserInfo(uname)
		if err != nil {
			http.Error(w, "Failed to validate authorisation", http.StatusInternalServerError)
			return
		}
		if userInfo.PermLevel < 3 {
			http.Error(w, "Unauthorised", http.StatusUnauthorized)
			return
		}

		//Get all users
		userList, err := getUserInfoAll()
		if err != nil {
			http.Error(w, "Unable to retrieve users", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(userList)
		return
	}

	http.NotFound(w, r)
}

// UpdateInventory handles requests to the /data endpoint via POST requests
func UpdateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.URL.Query().Has("paintStock") {
		var paint models.Paint
		err := json.NewDecoder(r.Body).Decode(&paint)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 2 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		err = updatePaintInventoryStockType(paint.ID, paint.StockType)
		if err != nil {
			http.Error(w, "Unable to update stock", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		return
	}

	if r.URL.Query().Has("updateUser") {
		var user models.UserWithPass
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 3 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		err = updateUser(user)
		if err != nil {
			log.Print(err)
			http.Error(w, "Unable to update user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		return
	}

	if r.URL.Query().Has("paintQuantity") {
		var paint models.Paint
		err := json.NewDecoder(r.Body).Decode(&paint)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 2 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		err = updatePaintInventoryQuantity(paint.ID, paint.Quantity)
		if err != nil {
			http.Error(w, "Unable to update stock", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		return
	}

	http.Error(w, "Invalid Route", http.StatusBadRequest)
	return
}

// AddInventory handles requests to the /data endpoint via PUT requests
func AddInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.URL.Query().Has("addUser") {
		var user models.NewUser
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 2 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		//Ensure new user does not already exist (check only username for simplicity)
		_, err = getUserInfo(user.Username)
		if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(w, "Database Error", http.StatusInternalServerError)
			return
		}

		if !errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(w, "Username Taken", http.StatusBadRequest)
			return
		}

		err = createUser(user)
		if err != nil {
			http.Error(w, "Unable to create user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		return
	}

	if r.URL.Query().Has("addPaint") {
		var paint models.NewPaint
		err := json.NewDecoder(r.Body).Decode(&paint)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 2 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		id, err := createPaint(paint)
		if err != nil {
			http.Error(w, "Unable to create paint", http.StatusInternalServerError)
			return
		}

		// Respond with Status Created and the new paint ID in the response body
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "text/plain")
		_, err = fmt.Fprintf(w, id.Hex())
		if err != nil {
			log.Println(err)
		}
		return

	}

	http.Error(w, "Invalid Route", http.StatusBadRequest)
	return
}

// DeleteInventory handles requests to the /data endpoint via DELETE requests
func DeleteInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.URL.Query().Has("deleteUser") {
		// Receive userID
		delUIDstr := r.URL.Query().Get("deleteUser")
		// Ensure delUIDstr is a valid ObjectID
		delUID, err := primitive.ObjectIDFromHex(delUIDstr)
		if err != nil {
			http.Error(w, "Invalid UserID", http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 3 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		err = deleteUser(delUID)
		if err != nil {
			http.Error(w, "Unable to delete user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		return
	}

	if r.URL.Query().Has("deleteInventoryItem") {
		// Receive itemID
		delIIDstr := r.URL.Query().Get("deleteInventoryItem")
		// Ensure delIIDstr is a valid ObjectID
		delIID, err := primitive.ObjectIDFromHex(delIIDstr)
		if err != nil {
			http.Error(w, "Invalid Item ID", http.StatusBadRequest)
			return
		}

		session, _ := store.Get(r, "bcpaint-session")
		// Check if user exists in the database (MongoDB)
		existingUser, err := getUserInfo(session.Values["username"].(string))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if existingUser.PermLevel < 2 {
			http.Error(w, "Insufficient authority", http.StatusUnauthorized)
			return
		}

		err = deleteInventoryItem(delIID)
		if err != nil {
			log.Println(err)
			http.Error(w, "Unable to delete inventory item", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		return
	}

	http.Error(w, "Invalid Route", http.StatusBadRequest)
	return
}
