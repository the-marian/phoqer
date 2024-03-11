package order

import "github.com/phoqer/api-gateway/types"

type FakeOrderRepository struct{}

func NewFakeOrderRepository() *FakeOrderRepository {
	return &FakeOrderRepository{}
}

func (r *FakeOrderRepository) CreateOrder(types.OrderModel) (string, error) {
	return "", nil
}

func (r *FakeOrderRepository) GetOrders(query *QueryOptions, pageSize int, currentPage int) ([]*types.OrderModel, error) {
	return []*types.OrderModel{}, nil
}

func (r *FakeOrderRepository) UpdateOrdersStatus(orderIds []string, status string) error {
	return nil
}

func (r *FakeOrderRepository) GetOrdersByIds(orderIds []string) ([]*types.OrderModel, error) {
	return []*types.OrderModel{}, nil
}

func (r *FakeOrderRepository) GetOrderById(orderId string) (*types.OrderModel, error) {
	return &types.OrderModel{}, nil
}

func (r *FakeOrderRepository) UpdateOrder(orderId string, order types.OrderModel) error {
	return nil
}
