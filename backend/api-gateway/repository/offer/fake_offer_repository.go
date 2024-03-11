package offer

import (
	"github.com/phoqer/api-gateway/types"
)

type FakeOfferRepository struct{}

func NewFakeOfferRepository() *FakeOfferRepository {
	return &FakeOfferRepository{}
}

func (r *FakeOfferRepository) CreateOffer(types.OfferModel) (string, error) {
	return "", nil
}

func (r *FakeOfferRepository) UpdateOffer(offerId string, offer types.OfferModel) error {
	return nil
}

func (r *FakeOfferRepository) GetOfferById(id string) (*types.OfferModel, error) {
	return &types.OfferModel{}, nil
}

func (r *FakeOfferRepository) GetOffersByIds(offerId []string, pageSize, currentPage int) ([]*types.OfferModel, error) {
	return []*types.OfferModel{}, nil
}

func (r *FakeOfferRepository) DeleteOffer(offerId string) error {
	return nil
}

func (r *FakeOfferRepository) GetOffers(query *QueryOptions, pageSize, currentPage int) ([]*types.OfferModel, error) {
	result := []*types.OfferModel{}
	for i := 0; i < 10; i++ {
		result = append(result, &types.OfferModel{
			Id:          "1",
			Title:       "Apple",
			AuthorId:    "64d77a657f6598b200c47077",
			Category:    "phones",
			Description: "description",
			Price:       100,
			Images:      []string{"https://picsum.photos/200/300"},
		})
	}
	return result, nil
}

func (r *FakeOfferRepository) SearchOffers(searchQuery string) ([]*types.OfferModel, error) {
	return []*types.OfferModel{}, nil
}

func (r *FakeOfferRepository) CountOffers(query *QueryOptions) (int, error) {
	return 20, nil
}

func (r *FakeOfferRepository) ReplaceOfferPayload(offerId string, imageURLS []string) error {
	return nil
}

func (r *FakeOfferRepository) IncrementViewsCounter(offerId string) error {
	return nil
}
