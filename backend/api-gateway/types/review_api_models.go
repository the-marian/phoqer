package types

type ReviewRequest struct {
	OfferId     string   `json:"offerId"`
	AuthorId    string   `json:"authorId"`
	Description string   `json:"description"`
	Score       float64  `json:"score"`
	Images      []string `json:"images"`
}

type ReviewResponse struct {
	ID          string   `json:"id"`
	OfferId     string   `json:"offerId"`
	Description string   `json:"description"`
	Score       float64  `json:"score"`
	Date        string   `json:"date"`
	Images      []string `json:"images"`
	AuthorId    string   `json:"authorId"`
}
