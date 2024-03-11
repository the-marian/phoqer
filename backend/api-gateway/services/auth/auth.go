package auth

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt"

	"github.com/phoqer/api-gateway/config"
	"golang.org/x/crypto/bcrypt"
)

func NewAuthService(config *config.Config) *AuthService {
	return &AuthService{
		config: config,
	}
}

type AuthService struct {
	config *config.Config
}

type AuthServiceInterface interface {
	CreateJWT(sub string) (string, error)
	CreateRefreshJWT(secretKey string) (string, error)
	GenerateTimestampWithOffset(offset time.Duration) int64
	ParseJWT(rawToken string) (*jwt.StandardClaims, error)
	getJWT(sub string, exp int64) (string, error)
}

func (s *AuthService) CreateJWT(sub string) (string, error) {
	token, err := s.getJWT(sub, time.Now().Add(s.config.AccessTokenLife).Unix())
	if err != nil {
		return "", err
	}
	return token, nil
}

func (s *AuthService) CreateRefreshJWT(sub string) (string, error) {
	token, err := s.getJWT(sub, time.Now().Add(s.config.RefreshTokenLife).Unix())
	if err != nil {
		log.Println(err)
		return "", err
	}
	return token, nil
}

func (s *AuthService) GenerateTimestampWithOffset(offset time.Duration) int64 {
	return time.Now().Add(s.config.AccessTokenLife).Unix()
}

func (s *AuthService) ParseJWT(rawToken string) (*jwt.StandardClaims, error) {
	token, err := jwt.ParseWithClaims(
		rawToken,
		&jwt.StandardClaims{},
		func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(s.config.SecretKey), nil
		})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*jwt.StandardClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("Could not parse this token")
}

func (s *AuthService) getJWT(sub string, exp int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": sub,
		"exp": exp,
	})
	tokenString, err := token.SignedString([]byte(s.config.SecretKey))
	if err != nil {
		log.Println(err)
		return "", err
	}
	return tokenString, nil
}

func CheckPasswordHash(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
