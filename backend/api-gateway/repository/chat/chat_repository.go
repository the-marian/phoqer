package chat

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/phoqer/api-gateway/types"
)

type Query struct {
	AuthorId string
	ClientId string
}

type ChatRepositoryInterface interface {
	CreateChat(types.ChatModel) (string, error)
	CreateMessage(*types.MessageModel) (string, error)
	GetChats(Query) ([]*types.ChatModel, error)
	GetMessages(chatId string, pageSize, currentPage int) ([]*types.MessageModel, error)
	CountMessages(chatId string) (int, error)
}

func NewChatRepository(client *mongo.Client) *ChatRepository {
	return &ChatRepository{
		client: client,
	}
}

type ChatRepository struct {
	client *mongo.Client
}

func (r *ChatRepository) CreateChat(chat types.ChatModel) (string, error) {
	authorId, err := primitive.ObjectIDFromHex(chat.AuthorId)
	if err != nil {
		return "", err
	}

	clientId, err := primitive.ObjectIDFromHex(chat.ClientId)
	if err != nil {
		return "", err
	}

	coll := r.client.Database("chat").Collection("chats")
	doc := bson.D{
		{Key: "authorId", Value: authorId},
		{Key: "clientId", Value: clientId},
		{Key: "createdAt", Value: time.Now()},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}
	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}

func (r *ChatRepository) CreateMessage(m *types.MessageModel) (string, error) {
	chatOdjectId, err := primitive.ObjectIDFromHex(m.ChatId)
	if err != nil {
		return "", err
	}
	userOdjectId, err := primitive.ObjectIDFromHex(m.UserId)
	if err != nil {
		return "", err
	}

	coll := r.client.Database("chat").Collection("messages")
	doc := bson.D{
		{Key: "chatId", Value: chatOdjectId},
		{Key: "createdAt", Value: m.CreatedAt},
		{Key: "isRead", Value: m.IsRead},
		{Key: "message", Value: m.Message},
		{Key: "messageType", Value: m.MessageType},
		{Key: "uploads", Value: m.Uploads},
		{Key: "userId", Value: userOdjectId},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}

	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}

func (r *ChatRepository) GetChats(query Query) ([]*types.ChatModel, error) {
	filter := bson.M{}
	if query.AuthorId != "" {
		authorId, _ := primitive.ObjectIDFromHex(query.AuthorId)
		filter["authorId"] = authorId
	}
	if query.ClientId != "" {
		clientId, _ := primitive.ObjectIDFromHex(query.ClientId)
		filter["clientId"] = clientId
	}
	coll := r.client.Database("chat").Collection("chats")
	cursor, err := coll.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var result []*types.ChatModel

	err = cursor.All(context.Background(), &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *ChatRepository) GetMessages(chatId string, pageSize, currentPage int) ([]*types.MessageModel, error) {
	objectId, err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		return nil, err
	}
	documentsToSkip := (currentPage - 1) * pageSize
	coll := r.client.Database("chat").Collection("messages")

	findOptions := options.Find().SetSkip(int64(documentsToSkip)).SetLimit(int64(pageSize)).SetSort(bson.D{{"createdAt", -1}})
	cursor, err := coll.Find(context.Background(), bson.D{{Key: "chatId", Value: objectId}}, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var result []*types.MessageModel

	err = cursor.All(context.Background(), &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *ChatRepository) CountMessages(chatId string) (int, error) {
	objectId, err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		return 0, err
	}
	coll := r.client.Database("chat").Collection("messages")

	count, err := coll.CountDocuments(context.Background(), bson.D{{Key: "chatId", Value: objectId}})
	if err != nil {
		return 0, err
	}
	return int(count), nil
}
