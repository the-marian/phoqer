package repository

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ConvertObjectIdsFromString(Ids []string) ([]primitive.ObjectID, error) {
	var objectIds []primitive.ObjectID
	for _, Id := range Ids {
		objectId, err := primitive.ObjectIDFromHex(Id)
		if err != nil {
			return nil, err
		}
		objectIds = append(objectIds, objectId)
	}
	return objectIds, nil
}

func ConvertObjectIdFromString(Id string) (primitive.ObjectID, error) {
	objectId, err := primitive.ObjectIDFromHex(Id)
	if err != nil {
		return primitive.NilObjectID, err
	}
	return objectId, err
}
