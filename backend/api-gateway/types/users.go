package types

type UserModel struct {
	Id             string   `bson:"_id"`
	AccountType    string   `bson:"accountType"`
	Avatar         string   `bson:"avatar"`
	CreatedAt      int64    `bson:"createdAt"`
	Email          string   `bson:"email"`
	FavoriteOffers []string `bson:"favoriteOffers"`
	FirstName      string   `bson:"firstName"`
	LastName       string   `bson:"lastName"`
	PasswordHash   string   `bson:"passwordHash"`
}
