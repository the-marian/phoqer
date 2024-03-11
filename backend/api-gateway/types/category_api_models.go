package types

type CategoryResponse struct {
	Title       string `json:"title"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Emoji       string `json:"emoji"`
	Image       string `json:"image"`
}

type CategoriesResponse []CategoryResponse
