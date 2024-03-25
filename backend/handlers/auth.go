// Package handlers provides http handlers for routing
package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	global "paintApp/glob"
	"paintApp/models"
)

func createUser(user models.NewUser) error {
	collection := global.MdbClient.Database(global.DbName).Collection("users")
	user.Password, _ = hashPass(user.Password)
	_, err := collection.InsertOne(context.Background(), user)
	return err
}

func updateUser(user models.UserWithPass) error {
	collection := global.MdbClient.Database(global.DbName).Collection("users")
	filter := bson.D{{"_id", user.ID}}
	update := bson.D{{"$set", bson.D{{"name", user.Name}, {"email", user.Email}, {"permLevel", user.PermLevel}, {"role", user.Role}}}}
	// If password is provided, hash and update. Otherwise, ignore.
	if user.Password != "" {
		hashedPass, _ := hashPass(user.Password)
		update = append(update, bson.E{Key: "$set", Value: bson.D{{"password", hashedPass}}})
	}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func deleteUser(id primitive.ObjectID) error {
	collection := global.MdbClient.Database(global.DbName).Collection("users")
	filter := bson.D{{"_id", id}}
	_, err := collection.DeleteOne(context.Background(), filter)
	return err
}

func getUserInfo(username string) (models.User, error) {
	collection := global.MdbClient.Database(global.DbName).Collection("users")
	var existingUser models.User
	filter := bson.D{{"username", username}}
	err := collection.FindOne(context.Background(), filter).Decode(&existingUser)
	return existingUser, err
}

func getUserInfoAll() ([]models.User, error) {
	collection := global.MdbClient.Database(global.DbName).Collection("users")
	var users []models.User
	filter := bson.D{}
	userCursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return users, err
	}
	err = userCursor.All(context.Background(), &users)
	return users, err
}

func hashPass(plaintext string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(plaintext), 12)
	return string(bytes), err
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Parse request body
	var user models.UserWithPass
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if user exists in the database (MongoDB)
	existingUser, err := getUserInfo(user.Username)
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Check for password match
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password))
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Start user session
	session, _ := store.Get(r, "bcpaint-session")
	session.Values["username"] = user.Username
	err = session.Save(r, w)
	if err != nil {
		log.Println(err)
	}

	// Respond
	w.WriteHeader(http.StatusOK)
	_, err = fmt.Fprintf(w, "Sign in successful!")
	if err != nil {
		log.Println(err)
	}
}

func SignOut(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	session, _ := store.Get(r, "bcpaint-session")
	session.Options.MaxAge = -1
	err := session.Save(r, w)
	if err != nil {
		log.Println(err)
	}
	w.WriteHeader(http.StatusOK)
	_, err = fmt.Fprintf(w, "Signed out successfully!")
	if err != nil {
		log.Println(err)
	}
}
