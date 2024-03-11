package types

import "time"

type ReviewModel struct {
	ID string `bson:"_id"`

	OfferId     string    `bson:"offerId"`
	AuthorId    string    `bson:"authorId"`
	Description string    `bson:"description"`
	Score       float64   `bson:"score"`
	CreatedAt   time.Time `bson:"createdAt"`
	Images      []string  `bson:"images"`
}
