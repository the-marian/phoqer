package config

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Host string

	MediaBucketName string

	GoogleClientId           string
	GoogleSecretKey          string
	GoogleCallbackUrl        string
	GoogleServiceAccountJSON string

	FacebookClientId    string
	FacebookSecretKey   string
	FacebookCallbackUrl string

	MongoDbUri       string
	SecretKey        string
	AccessTokenLife  time.Duration
	RefreshTokenLife time.Duration
}

func InitConfig() *Config {
	LoadEnvVariables()
	host := os.Getenv("API_HOST")
	googleCallbackUrl := "https://" + host + "/auth/callback?provider=google"
	facebookCallbackUrl := "https://" + host + "/auth/callback?provider=facebook"
	return &Config{
		Host: host,

		MediaBucketName: "media.phoqer.com",

		GoogleClientId:           os.Getenv("GOOGLE_CLIENT_ID"),
		GoogleSecretKey:          os.Getenv("GOOGLE_SECRET_KEY"),
		GoogleServiceAccountJSON: os.Getenv("GOOGLE_SERVICE_ACCOUNT_JSON"),
		GoogleCallbackUrl:        googleCallbackUrl,

		FacebookClientId:    os.Getenv("FACEBOOK_CLIENT_ID"),
		FacebookSecretKey:   os.Getenv("FACEBOOK_SECRET_KEY"),
		FacebookCallbackUrl: facebookCallbackUrl,

		MongoDbUri:       os.Getenv("MONGO_DB_URI"),
		SecretKey:        os.Getenv("SECRET_KEY"),
		AccessTokenLife:  time.Minute * 10,
		RefreshTokenLife: time.Hour * 24 * 30,
	}
}

func LoadEnvVariables() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
}

func InitTestConfig() *Config {
	return &Config{}
}
