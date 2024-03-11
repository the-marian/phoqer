package offer

import (
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/types"
)

func NewFakeOfferService() *OfferFakeService {
	return &OfferFakeService{}
}

type OfferFakeService struct{}

func (s *OfferFakeService) CreateOffer(authorId string, offer types.OfferRequest) (*types.OfferResponse, error) {
	return &types.OfferResponse{}, nil
}

func (s *OfferFakeService) UpdateOffer(offerId, authorId string, offer types.OfferRequest) (*types.OfferResponse, error) {
	return nil, nil
}

func (s *OfferFakeService) GetOfferById(string) (*types.OfferResponse, error) { return nil, nil }

func (s *OfferFakeService) GetOffers(pageSize, currentPage int) (*types.PaginatedResponse, error) {
	response := types.PaginatedResponse{
		Limit:       10,
		CurrentPage: 1,
		TotalItems:  20,
		TotalPages:  2,
		Data: []*types.OfferCardResponse{
			{
				Id:    "1",
				Title: "Apple",
			},
			{
				Id:    "2",
				Title: "MacBook",
			},
		},
	}
	return &response, nil
}

func (s *OfferFakeService) SearchOffers(searchQuery string) ([]*types.SearchOfferResponse, error) {
	response := []*types.SearchOfferResponse{
		{
			Id:       "1",
			Title:    "Apple",
			Category: "phones",
		},
		{
			Id:       "2",
			Title:    "MacBook",
			Category: "laptops",
		},
	}
	return response, nil
}

func (s *OfferFakeService) GetAuthorOffers(authorId string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	response := types.PaginatedResponse{
		Limit:       10,
		CurrentPage: 1,
		TotalItems:  20,
		TotalPages:  2,
		Data: []*types.OfferCardResponse{
			{
				Id:       "1",
				Title:    "Apple",
				AuthorId: authorId,
			},
			{
				Id:       "2",
				Title:    "MacBook",
				AuthorId: authorId,
			},
		},
	}
	return &response, nil
}

func (s *OfferFakeService) GetOffersByCategory(category string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	response := types.PaginatedResponse{
		Limit:       10,
		CurrentPage: 1,
		TotalItems:  20,
		TotalPages:  2,
		Data: []*types.OfferCardResponse{
			{
				Id:       "1",
				Title:    "Apple",
				AuthorId: "123",
				Category: category,
			},
			{
				Id:       "2",
				Title:    "MacBook",
				AuthorId: "321",
				Category: category,
			},
		},
	}
	return &response, nil
}

func (s *OfferFakeService) GetTopOffers(pageSize int) ([]*types.OfferCardResponse, error) {
	offersResponse := make([]*types.OfferCardResponse, 0)
	return offersResponse, nil
}

func (s *OfferFakeService) DeleteOffer(offerId string) error { return nil }

func (s *OfferFakeService) DeleteOfferPayload(offerId string, payload []string) error { return nil }

func (s *OfferFakeService) UpdateOfferPayload(offerId string, payload []string) (*types.OfferResponse, error) {
	return nil, nil
}

func (s *OfferFakeService) GetFavoriteOffers(email string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	return nil, nil
}

func (s *OfferFakeService) GetOffersByQuery(query *offer.QueryOptions, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	response := types.PaginatedResponse{
		Limit:       10,
		CurrentPage: 1,
		TotalItems:  20,
		TotalPages:  2,
		Data: []*types.OfferCardResponse{
			{
				Id:       "1",
				Title:    "Apple",
				AuthorId: "123",
				Category: "phones",
			},
			{
				Id:       "2",
				Title:    "MacBook",
				AuthorId: "321",
				Category: "laptops",
			},
		},
	}
	return &response, nil
}
