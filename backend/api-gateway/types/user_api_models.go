package types

type UserRequest struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password"`
	Avatar    string `json:"avatar"`
}

type UserResponse struct {
	Id          string `json:"id"`
	AccountType string `json:"accountType"`
	Avatar      string `json:"avatar"`
	CreatedAt   int64  `json:"createdAt"`
	Email       string `json:"email"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
}
