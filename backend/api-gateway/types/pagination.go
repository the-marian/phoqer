package types

type PaginatedResponse struct {
	Limit       int         `json:"limit"`
	CurrentPage int         `json:"currentPage"`
	TotalItems  int         `json:"totalItems"`
	TotalPages  int         `json:"totalPages"`
	Data        interface{} `json:"data"`
}
