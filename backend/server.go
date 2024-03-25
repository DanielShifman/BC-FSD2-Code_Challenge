package main

import (
	"context"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"os"
	global "paintApp/glob"
	"paintApp/handlers"
	"time"
)

// loadConfig loads sensitive configuration variables that are saved out-of-source for security reasons
func loadConfig() {
	global.MongoURI = os.Getenv("MONGO_URI")
	global.DbName = os.Getenv("DB_NAME")
	global.SessionSecret = os.Getenv("SESSION_SECRET")
	global.Port = os.Getenv("PORT")
}

// initDB initialises the connection to the database
func initDB() {
	// MongoDB connection
	clientOptions := options.Client().ApplyURI(global.MongoURI)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	global.MdbClient, _ = mongo.Connect(ctx, clientOptions)

	// Check the connection
	err := global.MdbClient.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to MongoDB!")
}

func main() {
	loadConfig()
	initDB()
	handlers.InitSessionStore()

	r := mux.NewRouter()

	r.HandleFunc("/signout", handlers.SignOut).Methods("GET")
	r.HandleFunc("/data", handlers.Inventory).Methods("GET")
	r.HandleFunc("/data", handlers.UpdateInventory).Methods("POST")
	r.HandleFunc("/signin", handlers.SignIn).Methods("POST")
	r.HandleFunc("/data", handlers.AddInventory).Methods("PUT")
	r.HandleFunc("/data", handlers.DeleteInventory).Methods("DELETE")
	r.HandleFunc("/data", handlers.InventoryPreflightHandler).Methods("OPTIONS")
	r.HandleFunc("/signin", handlers.AuthPreflightHandler).Methods("OPTIONS")
	r.HandleFunc("/signout", handlers.AuthPreflightHandler).Methods("OPTIONS")
	r.HandleFunc("/inventory", handlers.InventoryPreflightHandler).Methods("OPTIONS")
	r.HandleFunc("/admin", handlers.AdminPreflightHandler).Methods("OPTIONS")

	fs := http.FileServer(http.Dir("../frontend/dist"))
	r.PathPrefix("/").Handler(fs)

	http.Handle("/", r)

	addr := fmt.Sprintf(":%s", global.Port)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
		return
	}
}
