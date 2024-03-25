package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Paint struct {
	ID        primitive.ObjectID `bson:"_id" json:"id"`
	Item      string             `bson:"item" json:"item"`
	Colour    string             `bson:"colour" json:"colour"`
	Quantity  int                `bson:"quantity" json:"quantity"`
	StockType string             `bson:"stockType" json:"stockType"`
}

type NewPaint struct {
	Item      string `bson:"item" json:"item"`
	Colour    string `bson:"colour" json:"colour"`
	Quantity  int    `bson:"quantity" json:"quantity"`
	StockType string `bson:"stockType" json:"stockType"`
}
