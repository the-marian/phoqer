package types

type OfferRequest struct {
	Category    string   `json:"category"`
	Description string   `json:"description"`
	Images      []string `json:"images"`
	Price       int      `json:"price"`
	Title       string   `json:"title"`
}

type OfferCardResponse struct {
	Id       string `json:"id"`
	Price    int    `json:"price"`
	Title    string `json:"title"`
	AuthorId string `json:"authorId"`
	Category string `json:"category"`
	Image    string `json:"image"`
}

type OfferResponse struct {
	Id          string           `json:"id"`
	Price       int              `json:"price"`
	Title       string           `json:"title"`
	Author      UserResponse     `json:"author"`
	Description string           `json:"description"`
	Category    CategoryResponse `json:"category"`
	Images      []string         `json:"images"`
	Reviews     int              `json:"reviews"`
	Views       int              `json:"views"`
}

type OfferPayloadRequest struct {
	Images []string `json:"images"`
}

type SearchOfferResponse struct {
	Id           string `json:"id"`
	Title        string `json:"title"`
	Category     string `json:"category"`
	CategorySlug string `json:"categorySlug"`
}
