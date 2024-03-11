package offer

import (
	"errors"
	"log"
	"math/rand"
	"slices"
	"strings"
	"time"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/services/pagination"
	"github.com/phoqer/api-gateway/types"
)

var ErrOfferIdDoesNotExist = errors.New("Offer does not exist")

type OfferServiceInterface interface {
	CreateOffer(authorId string, offer types.OfferRequest) (*types.OfferResponse, error)
	UpdateOffer(offerId, authorId string, offer types.OfferRequest) (*types.OfferResponse, error)
	GetOfferById(string) (*types.OfferResponse, error)
	GetOffers(pageSize, currentPage int) (*types.PaginatedResponse, error)
	SearchOffers(string) ([]*types.SearchOfferResponse, error)
	GetAuthorOffers(authorId string, pageSize, currentPage int) (*types.PaginatedResponse, error)
	GetOffersByCategory(category string, pageSize, currentPage int) (*types.PaginatedResponse, error)
	DeleteOffer(offerId string) error
	DeleteOfferPayload(offerId string, imageURLS []string) error
	UpdateOfferPayload(offerId string, imageURLS []string) (*types.OfferResponse, error)
	GetTopOffers(pageSize int) ([]*types.OfferCardResponse, error)
	GetFavoriteOffers(userId string, pageSize, currentPage int) (*types.PaginatedResponse, error)
	GetOffersByQuery(query *offer.QueryOptions, pageSize, currentPage int) (*types.PaginatedResponse, error)
}

func NewOfferService(offerRepository offer.OfferRepositoryInterface, userRepository user.UserRepositoryInterface) *OfferService {
	return &OfferService{
		OfferRepository: offerRepository,
		UserRepository:  userRepository,
	}
}

type OfferService struct {
	OfferRepository offer.OfferRepositoryInterface
	UserRepository  user.UserRepositoryInterface
}

func (c *OfferService) CreateOffer(authorId string, offer types.OfferRequest) (*types.OfferResponse, error) {
	offerModel := types.OfferModel{
		AuthorId:    authorId,
		Category:    offer.Category,
		Description: offer.Description,
		Images:      offer.Images,
		Price:       offer.Price,
		Title:       offer.Title,
	}
	offerId, err := c.OfferRepository.CreateOffer(offerModel)
	if err != nil {
		return nil, err
	}
	offerData, err := c.GetOfferById(offerId)
	if err != nil {
		return nil, err
	}
	return offerData, err
}

func (c *OfferService) UpdateOffer(offerId, authorId string, offer types.OfferRequest) (*types.OfferResponse, error) {
	offerModel := types.OfferModel{
		Category:    offer.Category,
		Description: offer.Description,
		Images:      offer.Images,
		Price:       offer.Price,
		Title:       offer.Title,
	}
	err := c.OfferRepository.UpdateOffer(offerId, offerModel)
	if err != nil {
		return nil, err
	}
	updatedOffer, err := c.OfferRepository.GetOfferById(offerId)
	if err != nil {
		return nil, err
	}
	user, err := c.UserRepository.GetUserById(updatedOffer.AuthorId)
	if err != nil {
		log.Println("Unexpected error happen in GetUserById: ", err)
		return nil, err
	}

	response := &types.OfferResponse{
		Id: offerId,
		Author: types.UserResponse{
			Id:          user.Id,
			AccountType: user.AccountType,
			CreatedAt:   user.CreatedAt,
			Email:       user.Email,
			FirstName:   user.FirstName,
			LastName:    user.LastName,
		},
		Category: types.CategoryResponse{
			Slug:  updatedOffer.Category,
			Title: strings.Title(updatedOffer.Category),
		},
		Description: updatedOffer.Description,
		Images:      updatedOffer.Images,
		Price:       updatedOffer.Price,
		Title:       updatedOffer.Title,
	}

	return response, err
}

func (c *OfferService) DeleteOffer(offerId string) error {
	err := c.OfferRepository.DeleteOffer(offerId)
	return err
}

func (c *OfferService) GetOfferById(offerId string) (*types.OfferResponse, error) {
	offerData, err := c.OfferRepository.GetOfferById(offerId)
	if err != nil {
		if err == repository.ErrNotFound {
			return nil, ErrOfferIdDoesNotExist
		}
		log.Println("Unexpected error happen in GetOfferById: ", err)
		return nil, err
	}
	err = c.OfferRepository.IncrementViewsCounter(offerId)
	if err != nil {
		return nil, err
	}
	user, err := c.UserRepository.GetUserById(offerData.AuthorId)
	if err != nil {
		log.Println("Unexpected error happen in GetUserById: ", err)
		return nil, err
	}
	response := &types.OfferResponse{
		Id: offerId,
		Author: types.UserResponse{
			Id:          user.Id,
			AccountType: user.AccountType,
			CreatedAt:   user.CreatedAt,
			Email:       user.Email,
			FirstName:   user.FirstName,
			LastName:    user.LastName,
		},
		Category: types.CategoryResponse{
			Slug:  offerData.Category,
			Title: strings.Title(offerData.Category),
		},
		Description: offerData.Description,
		Images:      offerData.Images,
		Price:       offerData.Price,
		Reviews:     0,
		Title:       offerData.Title,
		Views:       offerData.Views,
	}

	return response, nil
}

func (c *OfferService) SearchOffers(query string) ([]*types.SearchOfferResponse, error) {
	offers, err := c.OfferRepository.SearchOffers(query)
	if err != nil {
		return nil, err
	}
	result := make([]*types.SearchOfferResponse, 0)
	for _, offer := range offers {
		result = append(result, &types.SearchOfferResponse{
			Id:           offer.Id,
			Title:        offer.Title,
			CategorySlug: offer.Category,
			Category:     strings.Title(offer.Category),
		})
	}
	return result, nil
}

func (c *OfferService) GetOffers(pageSize, currentPage int) (*types.PaginatedResponse, error) {
	query := &offer.QueryOptions{}
	return c.GetOffersByQuery(query, pageSize, currentPage)
}

func (c *OfferService) GetAuthorOffers(authorId string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	query := &offer.QueryOptions{
		AuthorId: authorId,
	}
	return c.GetOffersByQuery(query, pageSize, currentPage)
}

func (c *OfferService) GetOffersByCategory(category string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	query := &offer.QueryOptions{
		Category: category,
	}
	return c.GetOffersByQuery(query, pageSize, currentPage)
}

func (c *OfferService) GetOffersByQuery(query *offer.QueryOptions, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	offers, err := c.OfferRepository.GetOffers(query, pageSize, currentPage)
	if err != nil {
		return nil, err
	}

	offersCount, err := c.OfferRepository.CountOffers(query)
	if err != nil {
		return nil, err
	}
	offersResponse := getOffersResponse(offers)

	return pagination.PaginatedResponse(offersResponse, offersCount, pageSize, currentPage), nil
}

func (c *OfferService) GetFavoriteOffers(userId string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	user, err := c.UserRepository.GetUserById(userId)
	if err != nil {
		return nil, err
	}
	offerIds := user.FavoriteOffers
	offers, err := c.OfferRepository.GetOffersByIds(offerIds, pageSize, currentPage)
	if err != nil {
		return nil, err
	}
	offersCount := len(offerIds)
	offersResponse := getOffersResponse(offers)

	return pagination.PaginatedResponse(offersResponse, offersCount, pageSize, currentPage), nil
}

func getOffersResponse(offers []*types.OfferModel) []*types.OfferCardResponse {
	offersResponse := make([]*types.OfferCardResponse, 0)
	for _, offer := range offers {
		if len(offer.Images) == 0 {
			image := "https://via.placeholder.com/300x200.png?text=No+image"
			offer.Images = append(offer.Images, image)
		}

		offerCardResponse := &types.OfferCardResponse{
			Id:       offer.Id,
			Price:    offer.Price,
			Title:    offer.Title,
			AuthorId: offer.AuthorId,
			Category: offer.Category,
			Image:    offer.Images[0],
		}
		offersResponse = append(offersResponse, offerCardResponse)
	}
	return offersResponse
}

func deleteRequestOfferImages(allImages []string, requestImages []string) []string {
	// Filter images (images from db - images from request)
	var resultImages []string
	for _, e := range allImages {
		if !slices.Contains(requestImages, e) {
			resultImages = append(resultImages, e)
		}
	}
	return resultImages
}

func (c *OfferService) DeleteOfferPayload(offerId string, imageURLS []string) error {
	// Get offers images from db
	offerData, err := c.OfferRepository.GetOfferById(offerId)
	if err != nil {
		log.Println("Unexpected error happen in GetOfferById: ", err)
		return err
	}
	dbImages := offerData.Images
	replacedImages := deleteRequestOfferImages(dbImages, imageURLS)
	// Offer payload with new images list (call repository)
	err = c.OfferRepository.ReplaceOfferPayload(offerId, replacedImages)
	if err != nil {
		log.Println("Something went wrong in OfferRepository.ReplacedOfferPayload: ", err)
		return err
	}
	return nil
}

func (c *OfferService) UpdateOfferPayload(offerId string, imageURLS []string) (*types.OfferResponse, error) {
	err := c.OfferRepository.ReplaceOfferPayload(offerId, imageURLS)
	if err != nil {
		log.Println("Something went wrong in OfferRepository.ReplacedOfferPayload: ", err)
		return nil, err
	}
	offerData, err := c.OfferRepository.GetOfferById(offerId)
	if err != nil {
		log.Println("Unexpected error happen in GetOfferById: ", err)
		return nil, err
	}
	user, err := c.UserRepository.GetUserById(offerData.AuthorId)
	if err != nil {
		log.Println("Unexpected error happen in GetUserById: ", err)
		return nil, err
	}

	response := &types.OfferResponse{
		Id:    offerId,
		Price: offerData.Price,
		Title: offerData.Title,
		Author: types.UserResponse{
			Id:          user.Id,
			AccountType: user.AccountType,
			CreatedAt:   user.CreatedAt,
			Email:       user.Email,
			FirstName:   user.FirstName,
			LastName:    user.LastName,
		},
		Description: offerData.Description,
		Category: types.CategoryResponse{
			Slug:  offerData.Category,
			Title: strings.Title(offerData.Category),
		},
		Images:  offerData.Images,
		Reviews: 1,
	}

	return response, nil
}

func (c *OfferService) GetTopOffers(pageSize int) ([]*types.OfferCardResponse, error) {
	query := &offer.QueryOptions{}
	offers, err := c.OfferRepository.GetOffers(query, pageSize, 1)
	if err != nil {
		return nil, err
	}

	offersResponse := make([]*types.OfferCardResponse, 0)
	for _, offer := range offers {
		if len(offer.Images) == 0 {
			continue
		}
		offerCardResponse := &types.OfferCardResponse{
			Id:       offer.Id,
			Price:    offer.Price,
			Title:    offer.Title,
			AuthorId: offer.AuthorId,
			Category: offer.Category,
			Image:    offer.Images[0],
		}
		offersResponse = append(offersResponse, offerCardResponse)
	}
	r := rand.New(rand.NewSource(time.Now().Unix()))
	r.Shuffle(len(offersResponse), func(i, j int) {
		offersResponse[i], offersResponse[j] = offersResponse[j], offersResponse[i]
	})
	return offersResponse, nil
}
