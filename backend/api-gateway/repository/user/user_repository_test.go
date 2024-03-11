package user

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

var (
	userRepo *UserRepository
	UserId   string
)

func TestMain(m *testing.M) {
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("Could not construct pool: %s", err)
	}

	err = pool.Client.Ping()
	if err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}

	// pull mongodb docker image for version 5.0
	resource, err := pool.RunWithOptions(&dockertest.RunOptions{
		Repository: "mongo",
		Tag:        "5.0",
		Env: []string{
			// username and password for mongodb superuser
			"MONGO_INITDB_ROOT_USERNAME=root",
			"MONGO_INITDB_ROOT_PASSWORD=password",
		},
	}, func(config *docker.HostConfig) {
		// set AutoRemove to true so that stopped container goes away by itself
		config.AutoRemove = true
		config.RestartPolicy = docker.RestartPolicy{
			Name: "no",
		}
	})
	if err != nil {
		log.Fatalf("Could not start resource: %s", err)
	}

	// exponential backoff-retry, because the application in the container might not be ready to accept connections yet
	err = pool.Retry(func() error {
		client := repository.NewMongoDBClient(
			fmt.Sprintf("mongodb://root:password@localhost:%s", resource.GetPort("27017/tcp")),
		)
		userRepo = NewUserRepository(client)
		return userRepo.client.Ping(context.Background(), nil)
	})

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}
	// run tests
	code := m.Run()

	// disconnect mongodb client
	if err = userRepo.client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}

	// When you're done, kill and remove the container
	if err = pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	os.Exit(code)
}

func TestCreateUser(t *testing.T) {
	user := types.UserModel{
		Email:          "test@gmail.com",
		FirstName:      "Marian",
		LastName:       "Zozulia",
		PasswordHash:   "test",
		FavoriteOffers: []string{},
	}
	var err error
	UserId, err = userRepo.CreateUser(user)
	if err != nil {
		t.Error(err)
	}
}

func TestGetUserByEmail(t *testing.T) {
	user, err := userRepo.GetUserByEmail("test@gmail.com")
	if err != nil {
		t.Error(err)
	}
	if user.Email != "test@gmail.com" {
		t.Errorf("Expecting %s, got %s instead", "test@gmail.com", user.Email)
	}
}

func TestGetUserById(t *testing.T) {
	user, err := userRepo.GetUserById(UserId)
	if err != nil {
		t.Error(err)
	}
	if user.Id != UserId {
		t.Errorf("Expecting %s, got %s instead", "64a7054f4c1e2741512b5d72", user.Id)
	}
}

func TestAddFavoriteOffer(t *testing.T) {
	// user favorite offers before adding new one
	user, err := userRepo.GetUserById(UserId)
	if err != nil {
		t.Error(err)
	}
	if len(user.FavoriteOffers) != 0 {
		t.Errorf("Expecting %d, got %d instead", 0, len(user.FavoriteOffers))
	}
	// add new favorite offer
	err = userRepo.AddFavoriteOffer("test@gmail.com", "64d77a667f6598b200c4707a")
	if err != nil {
		t.Error(err)
	}
	// user favorite offers after adding new one
	user, err = userRepo.GetUserById(UserId)
	if err != nil {
		t.Error(err)
	}
	if len(user.FavoriteOffers) != 1 {
		t.Errorf("Expecting %d, got %d instead", 1, len(user.FavoriteOffers))
	}
}

func TestDeleteFavoriteOffer(t *testing.T) {
	// removing favorite offer
	err := userRepo.DeleteFavoriteOffer("test@gmail.com", "64d77a667f6598b200c4707a")
	if err != nil {
		t.Error(err)
	}
	user, err := userRepo.GetUserById(UserId)
	if err != nil {
		t.Error(err)
	}
	if len(user.FavoriteOffers) != 0 {
		t.Errorf("Expecting %d, got %d instead", 0, len(user.FavoriteOffers))
	}
}

func TestDeleteUser(t *testing.T) {
	err := userRepo.DeleteUser(UserId)
	if err != nil {
		t.Error(err)
	}
	_, err = userRepo.GetUserById(UserId)
	if err != repository.ErrNotFound {
		t.Error("DeleteUser operation failed, user still exist")
	}
}
