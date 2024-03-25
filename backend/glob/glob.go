// Package glob provides global variables for other packages to import
package glob

import "go.mongodb.org/mongo-driver/mongo"

type Config struct {
	MongoURI      string `json:"mongoURI"`
	DbName        string `json:"dbName"`
	SessionSecret string `json:"sessionSecret"`
}

var (
	MdbClient     *mongo.Client
	MongoURI      string
	DbName        string
	SessionSecret string
)
