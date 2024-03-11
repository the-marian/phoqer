package review

import "github.com/phoqer/api-gateway/types"

type FakeReviewRepository struct{}

func (r *FakeReviewRepository) CreateReview(types.ReviewModel) (string, error) {
	return "", nil
}
