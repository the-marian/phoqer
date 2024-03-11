package offer

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

type QueryOptions struct {
	AuthorId string
	Category string
}

type OfferRepositoryInterface interface {
	GetOfferById(offerId string) (*types.OfferModel, error)
	GetOffersByIds(offerIds []string, pageSize, currentPage int) ([]*types.OfferModel, error)
	GetOffers(query *QueryOptions, pageSize, currentPage int) ([]*types.OfferModel, error)
	SearchOffers(string) ([]*types.OfferModel, error)
	CreateOffer(types.OfferModel) (string, error)
	UpdateOffer(string, types.OfferModel) error
	DeleteOffer(offerId string) error
	ReplaceOfferPayload(offerId string, imageURLS []string) error
	CountOffers(query *QueryOptions) (int, error)
	IncrementViewsCounter(offerId string) error
}

func NewOfferRepository(client *mongo.Client) *OfferRepository {
	return &OfferRepository{
		client: client,
	}
}

type OfferRepository struct {
	client *mongo.Client
}

func (r OfferRepository) GetOfferById(offerId string) (*types.OfferModel, error) {
	var offerData types.OfferModel
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", offerId)

		return nil, repository.ErrNotFound
	}
	coll := r.client.Database("offer").Collection("offers")
	err = coll.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&offerData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// This error means your query did not match any documents.
			log.Printf("Offer with id: %s was not found.\n", offerId)
			return nil, repository.ErrNotFound
		}
		log.Println("Unexpected error happen in GetOfferById: ", err)

		return nil, err
	}

	return &offerData, nil
}

func (r OfferRepository) GetOffersByIds(offerIds []string, pageSize, currentPage int) ([]*types.OfferModel, error) {
	var objectIds []primitive.ObjectID
	for _, offerId := range offerIds {
		objectId, err := primitive.ObjectIDFromHex(offerId)
		if err != nil {
			log.Printf("string %s is not a valid ObjectID", offerId)

			return nil, repository.ErrNotFound
		}
		objectIds = append(objectIds, objectId)
	}
	documentsToSkip := (currentPage - 1) * pageSize
	coll := r.client.Database("offer").Collection("offers")
	findOptions := options.Find().SetSkip(int64(documentsToSkip)).SetLimit(int64(pageSize))
	cursor, err := coll.Find(context.Background(), bson.M{"_id": bson.M{"$in": objectIds}}, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	var offersData []*types.OfferModel
	err = cursor.All(context.Background(), &offersData)
	if err != nil {
		return nil, err
	}
	return offersData, nil
}

func (r *OfferRepository) CreateOffer(offer types.OfferModel) (string, error) {
	coll := r.client.Database("offer").Collection("offers")

	authorId, _ := primitive.ObjectIDFromHex(offer.AuthorId)
	doc := bson.D{
		{Key: "authorId", Value: authorId},
		{Key: "category", Value: offer.Category},
		{Key: "description", Value: offer.Description},
		{Key: "images", Value: offer.Images},
		{Key: "price", Value: offer.Price},
		{Key: "title", Value: offer.Title},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}
	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}

func (r *OfferRepository) UpdateOffer(offerId string, offer types.OfferModel) error {
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		return err
	}
	coll := r.client.Database("offer").Collection("offers")
	doc := bson.D{
		{
			Key: "$set", Value: bson.D{
				{Key: "category", Value: offer.Category},
				{Key: "description", Value: offer.Description},
				{Key: "images", Value: offer.Images},
				{Key: "price", Value: offer.Price},
				{Key: "title", Value: offer.Title},
			},
		},
	}
	filter := bson.D{{Key: "_id", Value: objectId}}
	_, err = coll.UpdateOne(context.TODO(), filter, doc)
	if err != nil {
		return err
	}
	return nil
}

func (r *OfferRepository) GetOffers(query *QueryOptions, pageSize, currentPage int) ([]*types.OfferModel, error) {
	documentsToSkip := (currentPage - 1) * pageSize
	filter := bson.M{}
	if query.AuthorId != "" {
		authorId, _ := primitive.ObjectIDFromHex(query.AuthorId)
		filter["authorId"] = authorId
	}
	if query.Category != "" {
		filter["category"] = query.Category
	}
	coll := r.client.Database("offer").Collection("offers")

	findOptions := options.Find().SetSkip(int64(documentsToSkip)).SetLimit(int64(pageSize))
	cursor, err := coll.Find(context.Background(), filter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var result []*types.OfferModel

	err = cursor.All(context.Background(), &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *OfferRepository) SearchOffers(searchQuery string) ([]*types.OfferModel, error) {
	filter := bson.M{
		"$text": bson.M{
			"$search": searchQuery,
		},
	}
	findOptions := options.Find().SetLimit(int64(10))
	coll := r.client.Database("offer").Collection("offers")

	cursor, err := coll.Find(context.Background(), filter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var result []*types.OfferModel

	err = cursor.All(context.Background(), &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *OfferRepository) CountOffers(query *QueryOptions) (int, error) {
	filter := bson.M{}
	if query.AuthorId != "" {
		authorId, _ := primitive.ObjectIDFromHex(query.AuthorId)
		filter["authorId"] = authorId
	}
	if query.Category != "" {
		filter["category"] = query.Category
	}

	coll := r.client.Database("offer").Collection("offers")

	count, err := coll.CountDocuments(context.Background(), filter)
	if err != nil {
		return 0, err
	}

	return int(count), nil
}

func (r *OfferRepository) DeleteOffer(offerId string) error {
	coll := r.client.Database("offer").Collection("offers")
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", offerId)
		return repository.ErrInvalidId
	}
	_, err = coll.DeleteOne(context.TODO(), bson.D{{Key: "_id", Value: objectId}})
	if err != nil {
		log.Printf(
			"unexpected error happen while deliting offer with id: %s. Actual error: %v\n",
			offerId,
			err,
		)
		return err
	}
	return nil
}

func (r *OfferRepository) ReplaceOfferPayload(offerId string, imageURLS []string) error {
	coll := r.client.Database("offer").Collection("offers")
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", offerId)
		return repository.ErrInvalidId
	}
	filter := bson.D{{Key: "_id", Value: objectId}}
	update := bson.M{"$set": bson.M{"images": imageURLS}}
	updateResult, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		fmt.Println("Error updating document:", err)
		return err
	}
	fmt.Printf("Matched %v document(s) and modified %v document(s)\n",
		updateResult.MatchedCount, updateResult.ModifiedCount)
	return nil
}

func (r *OfferRepository) createSearchIndex() error {
	coll := r.client.Database("offer").Collection("offers")
	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{Key: "title", Value: "text"},
			{Key: "description", Value: "text"},
		},
	}
	_, err := coll.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {
		return err
	}
	return nil
}

func (r *OfferRepository) IncrementViewsCounter(offerId string) error {
	coll := r.client.Database("offer").Collection("offers")
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", offerId)
		return repository.ErrInvalidId
	}
	filter := bson.D{{Key: "_id", Value: objectId}}
	update := bson.M{"$inc": bson.M{"views": 1}}
	_, err = coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		fmt.Println("Error updating document:", err)
		return err
	}
	return nil
}
