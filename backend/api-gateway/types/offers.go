package types

type OfferModel struct {
	Id          string   `bson:"_id"`
	AuthorId    string   `bson:"authorId"`
	Category    string   `bson:"category"`
	Description string   `bson:"description"`
	Images      []string `bson:"images"`
	Price       int      `bson:"price"`
	Title       string   `bson:"title"`
	Views       int      `bson:"views"`
}
