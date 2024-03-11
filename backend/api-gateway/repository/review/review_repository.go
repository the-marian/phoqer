package review

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/phoqer/api-gateway/types"
)

type ReviewRepositoryInterface interface {
	CreateReview(review types.ReviewModel) (string, error)
}

func NewReviewRepository(client *mongo.Client) *ReviewRepository {
	return &ReviewRepository{
		client: client,
	}
}

type ReviewRepository struct {
	client *mongo.Client
}

func (r *ReviewRepository) CreateReview(review types.ReviewModel) (string, error) {
	coll := r.client.Database("review").Collection("reviews")

	OfferId, _ := primitive.ObjectIDFromHex(review.OfferId)
	AuthorId, _ := primitive.ObjectIDFromHex(review.AuthorId)

	doc := bson.D{
		{Key: "offerId", Value: OfferId},
		{Key: "description", Value: review.Description},
		{Key: "score", Value: review.Score},
		{Key: "images", Value: review.Images},

		{Key: "authorId", Value: AuthorId},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}
	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}
