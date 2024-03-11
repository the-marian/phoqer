package types

import "time"

type OrderModel struct {
	Id string `bson:"_id"`

	OfferId     string   `bson:"offerId"`
	Title       string   `bson:"title"`
	Price       int      `bson:"price"`
	Description string   `bson:"description"`
	Images      []string `bson:"images"`
	Category    string   `bson:"category"`

	ClientId  string    `bson:"clientId"` // person who ordered (offer renter)
	AuthorId  string    `bson:"authorId"` // person who created offer (offer owner)
	Country   string    `bson:"country"`
	City      string    `bson:"city"`
	Zip       string    `bson:"zip"`
	Address   string    `bson:"address"`
	Comment   string    `bson:"comment"`
	StartDate time.Time `bson:"startDate"`
	Status    string    `bson:"status"`
}
