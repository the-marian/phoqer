package types

type AuthorAnalyticsResponse struct {
	Offers        int     `json:"offers"`
	TotalRequests int     `json:"totalRequests"`
	AverageScore  float64 `json:"averageScore"`
	Income        int     `json:"income"`
}

type OfferMetaResponse struct {
	CanDelete        bool `json:"canDelete"`
	CanEdit          bool `json:"canEdit"`
	CanRent          bool `json:"canRent"`
	CanAddToFavorite bool `json:"canAddToFavorite"`
	IsInFavorite     bool `json:"isInFavorite"`
	CanChat          bool `json:"canChat"`
}
