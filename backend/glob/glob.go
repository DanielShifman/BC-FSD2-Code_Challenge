// Package glob provides global variables for other packages to import
package glob

import "go.mongodb.org/mongo-driver/mongo"

var (
	MdbClient     *mongo.Client
	MongoURI      string
	DbName        string
	SessionSecret string
	Port          string
)
