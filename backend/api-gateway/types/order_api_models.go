package types

type OrderRequest struct {
	OfferId string `bson:"offerId"`
	Country string `bson:"country"`
	City    string `bson:"city"`
	Zip     string `bson:"zip"`
	Address string `bson:"address"`
	Comment string `bson:"comment"`
}

type OrderResponse struct {
	Id string `json:"id"`

	OfferId     string           `json:"offerId"`
	Title       string           `json:"title"`
	Price       int              `json:"price"`
	Description string           `json:"description"`
	Images      []string         `json:"images"`
	Sale        int              `json:"sale"`
	Category    CategoryResponse `json:"category"`

	Status  string `json:"status"`
	Country string `json:"country"`
	City    string `json:"city"`
	Zip     string `json:"zip"`
	Address string `json:"address"`
	Comment string `json:"comment"`

	Date      string `json:"date"`
	Expired   string `json:"expired"`
	StartDate int    `json:"startDate"`

	User UserResponse `json:"user"`
}

type ChangeOrdersStatusRequest struct {
	Ids    []string `json:"ids"`
	Status string   `json:"status"`
}

type ChangeOrderStatusRequest struct {
	Status string `json:"status"`
}
