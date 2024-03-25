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
	if global.Port == "" {
		fmt.Println("Port not set, defaulting to 8080")
		global.Port = "8080"
	}
	fmt.Println("Loaded configuration variables")
	fmt.Println("MongoURI: ", global.MongoURI)
	fmt.Println("DBName: ", global.DbName)
	fmt.Println("SessionSecret: ", global.SessionSecret)
	fmt.Println("Port: ", global.Port)
}

// initDB initialises the connection to the database
func initDB() {
	// MongoDB connection
	clientOptions := options.Client().ApplyURI(global.MongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	global.MdbClient, _ = mongo.Connect(ctx, clientOptions)

	// Check the connection
	err := global.MdbClient.Ping(ctx, nil)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Connected to MongoDB!")
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

	addr := fmt.Sprintf("0.0.0.0:%s", global.Port)
	err := http.ListenAndServeTLS(addr, "./certs/cert.pem", "./certs/key.pem", r)
	if err != nil {
		log.Fatal(err)
		return
	}
}
