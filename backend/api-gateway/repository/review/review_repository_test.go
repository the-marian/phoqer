package review

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

var reviewRepo *ReviewRepository

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
		reviewRepo = NewReviewRepository(client)
		return reviewRepo.client.Ping(context.Background(), nil)
	})

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}
	// run tests
	code := m.Run()

	// disconnect mongodb client
	if err = reviewRepo.client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}

	// When you're done, kill and remove the container
	if err = pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	os.Exit(code)
}

func TestCreateReview(t *testing.T) {
	review := types.ReviewModel{
		OfferId:     "74d77a657f6598b200c47077",
		Description: "Fast MacBook for this price",
		Score:       50,
		AuthorId:    "74d77a657f6598b200c47077",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	_, err := reviewRepo.CreateReview(review)
	if err != nil {
		t.Error(err)
	}
}
