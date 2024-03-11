package review

import "github.com/phoqer/api-gateway/types"

func NewFakeReviewService() *ReviewFakeService {
	return &ReviewFakeService{}
}

type ReviewFakeService struct{}

func (s *ReviewFakeService) CreateReview(user string, review types.ReviewRequest) (string, error) {
	return "", nil
}
