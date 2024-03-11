package user

import (
	"errors"
	"log"
	"time"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/types"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserAlreadyExist      = errors.New("User with this email already exist")
	ErrUserEmailIsEmptyField = errors.New("User email can not be empty")
	ErrUserDoesNotExist      = errors.New("User does not exist")
	ErrUserHashNoMatch       = errors.New("Hash and plaintext password no match")
	ErrUserPassIsEmptyField  = errors.New("User password can not be empty")
)

type UserServiceInterface interface {
	CreateUser(types.UserRequest) (string, error)
	GetUserByEmail(string) (*types.UserModel, error)
	GetUserById(string) (*types.UserModel, error)
	AddFavoriteOffer(string, string) error
	DeleteFavoriteOffer(string, string) error
}

func NewUserService(userRepository user.UserRepositoryInterface) *UserService {
	return &UserService{
		UserRepository: userRepository,
	}
}

type UserService struct {
	UserRepository user.UserRepositoryInterface
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func (s *UserService) CreateUser(user types.UserRequest) (string, error) {
	if user.Email == "" {
		return "", ErrUserEmailIsEmptyField
	}

	if user.Password == "" {
		return "", ErrUserPassIsEmptyField
	}

	PasswordHash, _ := HashPassword(user.Password)

	_, err := s.UserRepository.GetUserByEmail(user.Email)
	if err == nil {
		return "", ErrUserAlreadyExist
	}

	user_model := types.UserModel{
		Email:        user.Email,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		AccountType:  "client",
		Avatar:       user.Avatar,
		CreatedAt:    time.Now().Unix(),
		PasswordHash: PasswordHash,
	}
	userId, err := s.UserRepository.CreateUser(user_model)
	if err != nil {
		return "", err
	}
	return userId, nil
}

func (s *UserService) GetUserByEmail(email string) (*types.UserModel, error) {
	if email == "" {
		return nil, ErrUserEmailIsEmptyField
	}
	// generage hash from password
	userData, err := s.UserRepository.GetUserByEmail(email)
	if err != nil {
		if err == repository.ErrNotFound {
			return nil, ErrUserDoesNotExist
		}
		log.Println("Unexpected error happen in GetUserService: ", err)
		return nil, err
	}
	return userData, nil
}

func (s *UserService) GetUserById(userId string) (*types.UserModel, error) {
	if userId == "" {
		return nil, ErrUserEmailIsEmptyField
	}
	userData, err := s.UserRepository.GetUserById(userId)
	if err != nil {
		if err == repository.ErrNotFound {
			return nil, ErrUserDoesNotExist
		}
		log.Println("Unexpected error happen in GetUserService: ", err)
		return nil, err
	}
	return userData, nil
}

func (s *UserService) AddFavoriteOffer(userId string, offerId string) error {
	return s.UserRepository.AddFavoriteOffer(userId, offerId)
}

func (s *UserService) DeleteFavoriteOffer(userId string, offerId string) error {
	return s.UserRepository.DeleteFavoriteOffer(userId, offerId)
}
