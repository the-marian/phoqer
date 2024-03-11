package review

import (
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/review"
	"github.com/phoqer/api-gateway/types"
)

type ReviewServiceInterface interface {
	CreateReview(authorId string, review types.ReviewRequest) (string, error)
}

func NewReviewService(
	reviewRepository review.ReviewRepositoryInterface,
	offerRepository offer.OfferRepositoryInterface,
) *ReviewService {
	return &ReviewService{
		ReviewRepository: reviewRepository,
		OfferRepository:  offerRepository,
	}
}

type ReviewService struct {
	ReviewRepository review.ReviewRepositoryInterface
	OfferRepository  offer.OfferRepositoryInterface
}

func (c *ReviewService) CreateReview(authorId string, review types.ReviewRequest) (string, error) {
	reviewModel := types.ReviewModel{
		OfferId: review.OfferId,

		AuthorId: authorId,

		Description: review.Description,
		Score:       review.Score,
		Images:      review.Images,
	}
	reviewData, err := c.ReviewRepository.CreateReview(reviewModel)
	if err != nil {
		return "", err
	}
	return reviewData, err
}
