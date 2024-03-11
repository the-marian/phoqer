package user

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

type UserRepositoryInterface interface {
	CreateUser(types.UserModel) (string, error)
	GetUserByEmail(string) (*types.UserModel, error)
	GetUserById(string) (*types.UserModel, error)
	GetUsers([]string) ([]*types.UserModel, error)
	AddFavoriteOffer(string, string) error
	DeleteFavoriteOffer(string, string) error
}

type UserRepository struct {
	config *config.Config
	client *mongo.Client
}

func NewUserRepository(client *mongo.Client) *UserRepository {
	return &UserRepository{
		client: client,
	}
}

func (r UserRepository) CreateUser(user types.UserModel) (string, error) {
	coll := r.client.Database("user").Collection("users")
	doc := bson.D{
		{Key: "email", Value: user.Email},
		{Key: "firstName", Value: user.FirstName},
		{Key: "lastName", Value: user.LastName},
		{Key: "passwordHash", Value: user.PasswordHash},
		{Key: "isVerified", Value: false},
		{Key: "createdAt", Value: user.CreatedAt},
		{Key: "accountType", Value: user.AccountType},
		{Key: "avatar", Value: user.Avatar},
	}
	result, err := coll.InsertOne(context.TODO(), doc)
	if err != nil {
		return "", err
	}
	insertedID, _ := result.InsertedID.(primitive.ObjectID)
	return insertedID.Hex(), nil
}

func (r UserRepository) GetUserByEmail(email string) (*types.UserModel, error) {
	coll := r.client.Database("user").Collection("users")
	var userData types.UserModel
	err := coll.FindOne(context.TODO(), bson.D{{Key: "email", Value: email}}).Decode(&userData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// This error means your query did not match any documents.
			log.Printf("User with email: %s was not found.\n", email)
			return nil, repository.ErrNotFound
		}
		log.Println("Unexpected error happen in GetUserByEmail: ", err)
		return nil, err
	}
	return &userData, nil
}

// !!!!FOR TESTS ONLY!!!!
func (r UserRepository) GetUserById(userId string) (*types.UserModel, error) {
	var userData types.UserModel
	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", userId)
		return nil, repository.ErrInvalidId
	}
	coll := r.client.Database("user").Collection("users")
	err = coll.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&userData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, repository.ErrNotFound
		}
		log.Println("Unexpected error happen in GetUserById: ", err)
		return nil, err
	}
	return &userData, nil
}

func (r *UserRepository) GetUsers(ids []string) ([]*types.UserModel, error) {
	var objectIds []primitive.ObjectID
	for _, id := range ids {
		objectId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, repository.ErrInvalidId
		}
		objectIds = append(objectIds, objectId)
	}
	coll := r.client.Database("user").Collection("users")
	cursor, err := coll.Find(context.Background(), bson.M{
		"_id": bson.M{
			"$in": objectIds,
		},
	})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var usersData []*types.UserModel
	err = cursor.All(context.Background(), &usersData)
	if err != nil {
		return nil, err
	}
	log.Println(usersData)

	return usersData, nil
}

func (r UserRepository) DeleteUser(userId string) error {
	coll := r.client.Database("user").Collection("users")
	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", userId)
		return repository.ErrInvalidId
	}
	_, err = coll.DeleteOne(context.TODO(), bson.D{{Key: "_id", Value: objectId}})
	if err != nil {
		log.Printf(
			"unexpected error happen while deliting user with id: %s. Actual error: %v\n",
			userId,
			err,
		)
		return err
	}
	return nil
}

func (r UserRepository) AddFavoriteOffer(userId string, offerId string) error {
	coll := r.client.Database("user").Collection("users")
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", userId)
		return repository.ErrInvalidId
	}
	_, err = coll.UpdateOne(
		context.TODO(),
		bson.M{"email": userId},
		bson.M{"$addToSet": bson.M{"favoriteOffers": objectId}},
	)
	if err != nil {
		log.Printf(
			"unexpected error happen while adding offer with id: %s to user with id: %s. Actual error: %v\n",
			offerId,
			userId,
			err,
		)
		return err
	}
	return nil
}

func (r UserRepository) DeleteFavoriteOffer(userId string, offerId string) error {
	coll := r.client.Database("user").Collection("users")
	objectId, err := primitive.ObjectIDFromHex(offerId)
	if err != nil {
		log.Printf("string %s is not a valid ObjectID", userId)
		return repository.ErrInvalidId
	}
	_, err = coll.UpdateOne(
		context.TODO(),
		bson.M{"email": userId},
		bson.M{"$pull": bson.M{"favoriteOffers": objectId}},
	)
	if err != nil {
		log.Printf(
			"unexpected error happen while adding offer with id: %s to user with id: %s. Actual error: %v\n",
			offerId,
			userId,
			err,
		)
		return err
	}
	return nil
}
