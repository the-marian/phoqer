package order

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

type OrderRepositoryInterface interface {
	CreateOrder(order types.OrderModel) (string, error)
	GetOrders(query *QueryOptions, pageSize int, currentPage int) ([]*types.OrderModel, error)
	GetOrdersByIds(orderIds []string) ([]*types.OrderModel, error)
	GetOrderById(orderId string) (*types.OrderModel, error)
	CountOrders(query *QueryOptions) (int, error)
	UpdateOrdersStatus(orderIds []string, status string) error
	UpdateOrder(orderId string, order types.OrderModel) error
}

func NewOrderRepository(client *mongo.Client) *OrderRepository {
	return &OrderRepository{
		client: client,
	}
}

type OrderRepository struct {
	client *mongo.Client
}

func (r *OrderRepository) CreateOrder(order types.OrderModel) (string, error) {
	coll := r.client.Database("order").Collection("orders")

	offerId, _ := primitive.ObjectIDFromHex(order.OfferId)
	clientId, _ := primitive.ObjectIDFromHex(order.ClientId)
	authorId, _ := primitive.ObjectIDFromHex(order.AuthorId)

	doc := bson.D{
		{Key: "offerId", Value: offerId},
		{Key: "title", Value: order.Title},
		{Key: "price", Value: order.Price},
		{Key: "description", Value: order.Description},
		{Key: "images", Value: order.Images},
		{Key: "category", Value: order.Category},

		{Key: "clientId", Value: clientId},
		{Key: "authorId", Value: authorId},

		{Key: "country", Value: order.Country},
		{Key: "city", Value: order.City},
		{Key: "zip", Value: order.Zip},
		{Key: "address", Value: order.Address},
		{Key: "comment", Value: order.Comment},
		{Key: "status", Value: "pending"},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}
	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}

type QueryOptions struct {
	ClientId string
	AuthorId string
	Status   string
}

func (r *OrderRepository) GetOrders(query *QueryOptions, pageSize int, currentPage int) ([]*types.OrderModel, error) {
	documentsToSkip := (currentPage - 1) * pageSize
	coll := r.client.Database("order").Collection("orders")
	findOptions := options.Find().SetSkip(int64(documentsToSkip)).SetLimit(int64(pageSize))

	filter := bson.M{}
	if query.ClientId != "" {
		clientId, _ := primitive.ObjectIDFromHex(query.ClientId)
		filter["clientId"] = clientId
	}

	if query.AuthorId != "" {
		authorId, _ := primitive.ObjectIDFromHex(query.AuthorId)
		filter["authorId"] = authorId
	}

	if query.Status != "" {
		filter["status"] = query.Status
	}

	cursor, err := coll.Find(context.Background(), filter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var orders []*types.OrderModel

	err = cursor.All(context.Background(), &orders)
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (r *OrderRepository) GetOrdersByIds(orderIds []string) ([]*types.OrderModel, error) {
	objectIds, err := repository.ConvertObjectIdsFromString(orderIds)
	if err != nil {
		return nil, err
	}
	coll := r.client.Database("order").Collection("orders")
	cursor, err := coll.Find(context.Background(), bson.M{"_id": bson.M{"$in": objectIds}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	var ordersData []*types.OrderModel
	err = cursor.All(context.Background(), &ordersData)
	if err != nil {
		return nil, err
	}
	return ordersData, nil
}

func (r *OrderRepository) GetOrderById(orderId string) (*types.OrderModel, error) {
	var orderData types.OrderModel
	objectId, err := repository.ConvertObjectIdFromString(orderId)
	if err != nil {
		return nil, err
	}
	coll := r.client.Database("order").Collection("orders")
	err = coll.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&orderData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// This error means your query did not match any documents.
			log.Printf("Order with id: %s was not found.\n", orderId)
			return nil, repository.ErrNotFound
		}
		log.Println("Unexpected error happen in GetOrderById: ", err)

		return nil, err
	}
	return &orderData, nil
}

func (r *OrderRepository) CountOrders(query *QueryOptions) (int, error) {
	coll := r.client.Database("order").Collection("orders")
	filter := bson.M{}
	if query.ClientId != "" {
		clientId, _ := primitive.ObjectIDFromHex(query.ClientId)
		filter["clientId"] = clientId
	}

	if query.AuthorId != "" {
		authorId, _ := primitive.ObjectIDFromHex(query.AuthorId)
		filter["authorId"] = authorId
	}

	if query.Status != "" {
		filter["status"] = query.Status
	}

	count, err := coll.CountDocuments(context.Background(), filter)
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

func (r *OrderRepository) UpdateOrdersStatus(orderIds []string, status string) error {
	objectIds, err := repository.ConvertObjectIdsFromString(orderIds)
	if err != nil {
		return err
	}
	coll := r.client.Database("order").Collection("orders")
	filter := bson.M{"_id": bson.M{"$in": objectIds}}
	doc := bson.D{{Key: "$set", Value: bson.D{{Key: "status", Value: status}}}}
	_, err = coll.UpdateMany(context.TODO(), filter, doc)
	if err != nil {
		return err
	}
	return nil
}

func (r *OrderRepository) UpdateOrder(orderId string, order types.OrderModel) error {
	objectId, err := primitive.ObjectIDFromHex(orderId)
	if err != nil {
		return err
	}
	orderDoc := bson.M{}
	if !order.StartDate.IsZero() {
		orderDoc["startDate"] = order.StartDate
	}
	if order.Status != "" {
		orderDoc["status"] = order.Status
	}
	coll := r.client.Database("order").Collection("orders")
	filter := bson.D{{Key: "_id", Value: objectId}}
	doc := bson.M{"$set": orderDoc}
	_, err = coll.UpdateOne(context.TODO(), filter, doc)
	if err != nil {
		return err
	}
	return nil
}
