package user

import (
	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

type FakeUserRepository struct{}

func NewFakeUserRepository() *FakeUserRepository {
	return &FakeUserRepository{}
}

func (r *FakeUserRepository) CreateUser(types.UserModel) (string, error) {
	return "", nil
}

func (r *FakeUserRepository) GetUserByEmail(email string) (*types.UserModel, error) {
	switch email {
	case "user_exist@gmail.com":
		return &types.UserModel{
			Id:           "64a7054f4c1e2741512b5d72",
			Email:        "user_exist@gmail.com",
			FirstName:    "Maria",
			LastName:     "Zozuli",
			PasswordHash: "dupa123",
		}, nil
	default:
		return nil, repository.ErrNotFound
	}
}

func (r *FakeUserRepository) GetUserById(email string) (*types.UserModel, error) {
	return &types.UserModel{}, nil
}

func (r *FakeUserRepository) GetUsers(email []string) ([]*types.UserModel, error) {
	return []*types.UserModel{}, nil
}

func (r *FakeUserRepository) AddFavoriteOffer(userId string, offerId string) error {
	return nil
}

func (r *FakeUserRepository) DeleteFavoriteOffer(userId string, offerId string) error {
	return nil
}
