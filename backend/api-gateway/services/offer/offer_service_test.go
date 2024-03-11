package offer

import (
	"log"
	"slices"
	"testing"

	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/types"
)

func TestGetOffers(t *testing.T) {
	offerRepo := offer.NewFakeOfferRepository()
	userRepo := user.NewFakeUserRepository()
	offerService := NewOfferService(offerRepo, userRepo)
	paginatedResponse, err := offerService.GetOffers(10, 1)
	if err != nil {
		t.Error(err)
	}
	if paginatedResponse.Limit != 10 {
		t.Errorf("Expecting 10 offers, got %d instead", paginatedResponse.Limit)
	}

	if paginatedResponse.CurrentPage != 1 {
		t.Errorf("Expecting 1 offers, got %d instead", paginatedResponse.CurrentPage)
	}

	if paginatedResponse.TotalItems != 20 {
		t.Errorf("Expecting 20 offers, got %d instead", paginatedResponse.TotalItems)
	}

	if paginatedResponse.TotalPages != 2 {
		t.Errorf("Expecting 2 pages, got %d instead", paginatedResponse.TotalPages)
	}

	if len(paginatedResponse.Data.([]*types.OfferCardResponse)) != 10 {
		t.Errorf("Expecting 20 offers, got %d instead", len(paginatedResponse.Data.([]*types.OfferCardResponse)))
	}
}

func TestDeleteRequestOfferImages(t *testing.T) {
	allImages := []string{"za", "lu", "pa", "su", "ka"}
	requestImages := []string{"lu", "su"}
	expectedResult := []string{"za", "pa", "ka"}
	resultImages := deleteRequestOfferImages(allImages, requestImages)
	if slices.Compare(resultImages, expectedResult) != 0 {
		log.Println("Something went wrong in the DeleteRequestOfferImages function")
	}
}
