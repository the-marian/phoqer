package offer

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
	offerRepo *OfferRepository
	OfferId   string
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
		offerRepo = NewOfferRepository(client)
		return offerRepo.client.Ping(context.Background(), nil)
	})

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}
	// run tests
	code := m.Run()

	// disconnect mongodb client
	if err = offerRepo.client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}

	// When you're done, kill and remove the container
	if err = pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	os.Exit(code)
}

func TestGetOffersPaged(t *testing.T) {
	offer := types.OfferModel{
		Title:       "MacBook Pro",
		Description: "super cool product",
		Price:       111,
		Category:    "unique category",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	for i := 0; i < 13; i++ {
		offerRepo.CreateOffer(offer)
	}
	offers, err := offerRepo.GetOffers(&QueryOptions{}, 10, 2)
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 3 {
		t.Errorf("This test should return exectly three offers, for some reason were returned %v", len(offers))
	}
}

func TestCountOffers(t *testing.T) {
	count, err := offerRepo.CountOffers(&QueryOptions{})
	if err != nil {
		t.Error(err)
	}
	if count != 13 {
		t.Errorf("This test should return exectly 13 offers, for some reason were returned %v", count)
	}
}

func TestCreateOffer(t *testing.T) {
	offer := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47078",
		Title:       "Ps6",
		Description: "super duper cool console",
		Price:       100,
		Category:    "gaming console",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	var err error
	OfferId, err = offerRepo.CreateOffer(offer)
	if err != nil {
		t.Error(err)
	}
}

func TestGetOfferById(t *testing.T) {
	offer, err := offerRepo.GetOfferById(OfferId)
	if err != nil {
		t.Error(err)
	}
	if offer.Id != OfferId {
		t.Errorf("Expecting %s, got %s instead", OfferId, offer.Id)
	}
}

func TestGetOffersByAuthorId(t *testing.T) {
	offer1 := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47079",
		Title:       "iPhone",
		Description: "super cool phone",
		Price:       111,
		Category:    "gaming phone",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	id1, _ := offerRepo.CreateOffer(offer1)
	offer2 := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47077", // different author id
		Title:       "iPhone",
		Description: "super cool phone",
		Price:       111,
		Category:    "gaming phone",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	offerRepo.CreateOffer(offer2)

	options := QueryOptions{
		AuthorId: "64d77a657f6598b200c47079",
	}
	offers, err := offerRepo.GetOffers(&options, 10, 1)
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 1 {
		t.Errorf("This test should return exectly one offer, for some reason were returned %v", len(offers))
	}
	if offers[0].Id != id1 {
		t.Error()
	}
}

func TestGetOffersByCategory(t *testing.T) {
	offer1 := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47077", // Ihor
		Title:       "MacBook Pro",
		Description: "super cool laptop",
		Price:       111,
		Category:    "laptop",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	id1, _ := offerRepo.CreateOffer(offer1)
	offer2 := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47077", // Ihor
		Title:       "iPhone 13",
		Description: "super cool phone",
		Price:       111,
		Category:    "not a laptor",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	offerRepo.CreateOffer(offer2)

	options := QueryOptions{
		Category: "laptop",
	}
	offers, err := offerRepo.GetOffers(&options, 10, 1)
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 1 {
		t.Errorf("This test should return exectly one offer, for some reason were returned %v", len(offers))
	}
	if offers[0].Id != id1 {
		t.Error()
	}
}

func TestDeleteOffer(t *testing.T) {
	err := offerRepo.DeleteOffer(OfferId)
	if err != nil {
		t.Error(err)
	}
	_, err = offerRepo.GetOfferById(OfferId)
	if err != repository.ErrNotFound {
		t.Error("DeleteOffer operation failed, offer still exists")
	}
}

func TestReplaceOfferPayload(t *testing.T) {
	offer := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47077", // Ihor
		Title:       "MacBook Pro",
		Description: "super cool laptop",
		Price:       111,
		Category:    "laptop",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	newImages := []string{"www.image/za", "www.image/lu", "www.image/pa"}
	id1, _ := offerRepo.CreateOffer(offer)
	err := offerRepo.ReplaceOfferPayload(id1, newImages)
	if err != nil {
		t.Error(err)
	}
	newOffer, err := offerRepo.GetOfferById(id1)
	if err != nil {
		t.Error(err)
	}
	if newOffer.Images[0] != newImages[0] {
		t.Errorf("Expecting %s, got %s instead", newImages, offer.Images)
	}
}

func TestUpdateOffer(t *testing.T) {
	offer := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47078", // Marian
		Title:       "MacBook Pro",
		Description: "super cool laptop",
		Price:       111,
		Category:    "laptop",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	offerId, _ := offerRepo.CreateOffer(offer)

	newOffer := types.OfferModel{
		Title:       "MacBook Pro 2021",
		Description: "cool laptop",
		Price:       222,
		Category:    "laptop",
		Images: []string{
			"www.image.com/4",
			"www.image.com/5",
			"www.image.com/6",
		},
	}

	err := offerRepo.UpdateOffer(offerId, newOffer)
	if err != nil {
		t.Error(err)
	}

	updatedOffer, err := offerRepo.GetOfferById(offerId)
	if err != nil {
		t.Error(err)
	}
	if updatedOffer.AuthorId != offer.AuthorId {
		t.Errorf("Expecting %s, got %s instead", offer.AuthorId, updatedOffer.AuthorId)
	}
	if updatedOffer.Title != newOffer.Title {
		t.Errorf("Expecting %s, got %s instead", newOffer.Title, updatedOffer.Title)
	}
	if updatedOffer.Description != newOffer.Description {
		t.Errorf("Expecting %s, got %s instead", newOffer.Description, updatedOffer.Description)
	}
	if updatedOffer.Price != newOffer.Price {
		t.Errorf("Expecting %d, got %d instead", newOffer.Price, updatedOffer.Price)
	}
	if updatedOffer.Category != newOffer.Category {
		t.Errorf("Expecting %s, got %s instead", newOffer.Category, updatedOffer.Category)
	}
	if updatedOffer.Images[0] != newOffer.Images[0] {
		t.Errorf("Expecting %s, got %s instead", newOffer.Images[0], updatedOffer.Images[0])
	}
}

func TestSearchOffers(t *testing.T) {
	err := offerRepo.createSearchIndex()
	if err != nil {
		t.Error(err)
	}
	offer := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47078", // Marian
		Title:       "ultrararetitle",
		Description: "description of the offer",
		Price:       111,
		Category:    "laptop",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	_, _ = offerRepo.CreateOffer(offer)

	offers, err := offerRepo.SearchOffers("ultrararetitle")
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 1 {
		t.Errorf("Expecting %d, got %d instead", 1, len(offers))
	}

	offers, err = offerRepo.SearchOffers("description")
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 1 {
		t.Errorf("Expecting %d, got %d instead", 1, len(offers))
	}

	offers, err = offerRepo.SearchOffers("dupa")
	if err != nil {
		t.Error(err)
	}
	if len(offers) != 0 {
		t.Errorf("Expecting %d, got %d instead", 0, len(offers))
	}
}

func TestGetOffersByIds(t *testing.T) {
	var offers []string
	for i := 0; i < 13; i++ {
		offer := types.OfferModel{
			AuthorId:    "64d77a657f6598b200c47077", // Ihor
			Title:       "iPhone7",
			Description: "super cool phone",
			Price:       111,
			Category:    "gaming phone",
			Images: []string{
				"www.image.com/1",
				"www.image.com/2",
				"www.image.com/3",
			},
		}
		offerId, err := offerRepo.CreateOffer(offer)
		if err != nil {
			t.Error(err)
		}
		offers = append(offers, offerId)
	}
	result, err := offerRepo.GetOffersByIds(offers, 10, 2)
	if err != nil {
		t.Error(err)
	}
	if len(result) != 3 {
		t.Errorf("Expecting %d, got %d instead", 3, len(result))
	}
}

func TestIncreaseViewsOffer(t *testing.T) {
	offer := types.OfferModel{
		AuthorId:    "64d77a657f6598b200c47077", // Ihor
		Title:       "Xiaomi mi 18",
		Description: "super duper cool phone",
		Price:       111,
		Category:    "gaming phone",
		Images: []string{
			"www.image.com/1",
			"www.image.com/2",
			"www.image.com/3",
		},
	}
	offerId, err := offerRepo.CreateOffer(offer)
	if err != nil {
		t.Error(err)
	}
	newOffer, err := offerRepo.GetOfferById(offerId)
	if err != nil {
		t.Error(err)
	}
	if newOffer.Views != 0 {
		t.Errorf("Expecting %d views, got %d instead", 0, newOffer.Views)
	}
	err = offerRepo.IncrementViewsCounter(offerId)
	if err != nil {
		t.Error(err)
	}
	newOffer, err = offerRepo.GetOfferById(offerId)
	if err != nil {
		t.Error(err)
	}
	if newOffer.Views == 0 {
		t.Errorf("Expecting %d views, got 0 instead", 1)
	}
}
