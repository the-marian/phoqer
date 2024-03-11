package meta

import (
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/types"
)

type MetaServiceInterface interface {
	GetOfferMeta(userId string, offerId string) (*types.OfferMetaResponse, error)
}

func NewMetaService(OfferRepository offer.OfferRepositoryInterface) *MetaService {
	return &MetaService{
		OfferRepository: OfferRepository,
	}
}

type MetaService struct {
	OfferRepository offer.OfferRepositoryInterface
}

func (s *MetaService) GetOfferMeta(userId string, offerId string) (*types.OfferMetaResponse, error) {
	offer, err := s.OfferRepository.GetOfferById(offerId)
	if err != nil {
		return nil, err
	}
	if offer.AuthorId == userId {
		return &types.OfferMetaResponse{
			CanDelete:        true,
			CanEdit:          true,
			CanRent:          false,
			CanChat:          false,
			CanAddToFavorite: false,
			IsInFavorite:     false,
		}, nil
	} else {
		return &types.OfferMetaResponse{
			CanDelete:        false,
			CanEdit:          false,
			CanRent:          true,
			CanChat:          true,
			CanAddToFavorite: true,
			IsInFavorite:     false,
		}, nil
	}
}
