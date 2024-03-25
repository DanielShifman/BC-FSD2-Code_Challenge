// Package models structs representing core entities
package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id" json:"id"`
	Name      string             `bson:"name" json:"name"`
	Username  string             `bson:"username" json:"username"`
	Password  string             `bson:"password" json:"-"`
	Email     string             `bson:"email" json:"email"`
	PermLevel int                `bson:"permLevel" json:"permLevel"`
	Role      string             `bson:"role" json:"role"`
}

type UserWithPass struct {
	ID        primitive.ObjectID `bson:"_id" json:"id"`
	Name      string             `bson:"name" json:"name"`
	Username  string             `bson:"username" json:"username"`
	Password  string             `bson:"password" json:"password"`
	Email     string             `bson:"email" json:"email"`
	PermLevel int                `bson:"permLevel" json:"permLevel"`
	Role      string             `bson:"role" json:"role"`
}

type NewUser struct {
	Name      string `bson:"name" json:"name"`
	Username  string `bson:"username" json:"username"`
	Password  string `bson:"password" json:"password"`
	Email     string `bson:"email" json:"email"`
	PermLevel int    `bson:"permLevel" json:"permLevel"`
	Role      string `bson:"role" json:"role"`
}
