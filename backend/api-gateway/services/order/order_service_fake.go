package order

import "github.com/phoqer/api-gateway/types"

func NewFakeOrderService() *OrderFakeService {
	return &OrderFakeService{}
}

type OrderFakeService struct{}

func (s *OrderFakeService) CreateOrder(user string, order types.OrderRequest) (string, error) {
	return "", nil
}

func GetOrders(author, status string, pageSize int, currentPage int) (*types.PaginatedResponse, error) {
	return nil, nil
}

func UpdateOrderStatus(orderIds []string, status string) error {
	return nil
}
