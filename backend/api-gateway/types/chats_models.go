package types

import "time"

type ChatModel struct {
	Id        string    `bson:"_id"`
	AuthorId  string    `bson:"authorId"`
	ClientId  string    `bson:"clientId"`
	CreatedAt time.Time `bson:"createdAt"`
}

type MessageModel struct {
	Id          string    `bson:"_id"`
	ChatId      string    `bson:"chatId"`
	CreatedAt   time.Time `bson:"createdAt"`
	IsRead      bool      `bson:"isRead"`
	Message     string    `bson:"message"`
	MessageType string    `bson:"messageType"`
	Uploads     []string  `bson:"uploads"`
	UserId      string    `bson:"userId"`
}
