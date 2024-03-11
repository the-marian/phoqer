package types

type AuthorResponse struct {
	Id        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	CreatedAt int    `json:"createdAt"`
	Avatar    string `json:"avatar"`
}
