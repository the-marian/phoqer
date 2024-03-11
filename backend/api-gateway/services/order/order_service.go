package order

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/phoqer/api-gateway/repository/category"
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/order"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/services/pagination"
	"github.com/phoqer/api-gateway/types"
)

type OrderServiceInterface interface {
	CreateOrder(userId string, order types.OrderRequest) (string, error)
	GetOrders(authorId, status string, pageSize int, currentPage int) (*types.PaginatedResponse, error)
	UpdateOrdersStatus(orderIds []string, status string) error
	UpdateOrderStatus(orderId, status string) error
}

func NewOrderService(
	categoryRepository category.CategoryRepositoryInterface,
	offerRepository offer.OfferRepositoryInterface,
	orderRepository order.OrderRepositoryInterface,
	userRepository user.UserRepositoryInterface,
) *OrderService {
	return &OrderService{
		CategoryRepository: categoryRepository,
		OfferRepository:    offerRepository,
		OrderRepository:    orderRepository,
		UserRepository:     userRepository,
	}
}

type OrderService struct {
	CategoryRepository category.CategoryRepositoryInterface
	OfferRepository    offer.OfferRepositoryInterface
	OrderRepository    order.OrderRepositoryInterface
	UserRepository     user.UserRepositoryInterface
}

func (c *OrderService) CreateOrder(clientId string, order types.OrderRequest) (string, error) {
	offer, err := c.OfferRepository.GetOfferById(order.OfferId)
	if err != nil {
		return "", err
	}
	orderModel := types.OrderModel{
		Title:       offer.Title,
		Price:       offer.Price,
		Description: offer.Description,
		Images:      offer.Images,
		Category:    offer.Category,

		ClientId: clientId,
		AuthorId: offer.AuthorId,
		OfferId:  order.OfferId,
		Country:  order.Country,
		City:     order.City,
		Zip:      order.Zip,
		Address:  order.Address,
		Comment:  order.Comment,
	}
	orderId, err := c.OrderRepository.CreateOrder(orderModel)
	if err != nil {
		return "", err
	}
	return orderId, nil
}

func (s *OrderService) GetOrders(authorId, status string, pageSize int, currentPage int) (*types.PaginatedResponse, error) {
	query := order.QueryOptions{
		AuthorId: authorId,
		Status:   status,
	}
	return s.getOrders(query, pageSize, currentPage)
}

func (s *OrderService) getOrders(query order.QueryOptions, pageSize int, currentPage int) (*types.PaginatedResponse, error) {
	orders, err := s.OrderRepository.GetOrders(&query, pageSize, currentPage)
	if err != nil {
		return nil, err
	}

	clientIds := make([]string, len(orders))
	for i, order := range orders {
		clientIds[i] = order.ClientId
	}
	clients, err := s.UserRepository.GetUsers(clientIds)
	if err != nil {
		return nil, err
	}
	clientsMap := getUsersMap(clients)

	count, err := s.OrderRepository.CountOrders(&query)
	if err != nil {
		return nil, err
	}

	orderResponse := make([]*types.OrderResponse, len(orders))
	for i, order := range orders {
		user := clientsMap[order.ClientId]
		orderResponse[i] = &types.OrderResponse{
			Id: order.Id,
			User: types.UserResponse{
				Id:          user.Id,
				AccountType: user.AccountType,
				CreatedAt:   user.CreatedAt,
				Email:       user.Email,
				FirstName:   user.FirstName,
				LastName:    user.LastName,
			},

			OfferId:     order.OfferId,
			Title:       order.Title,
			Price:       order.Price,
			Description: order.Description,
			Images:      order.Images,
			Category: types.CategoryResponse{
				Slug:  order.Category,
				Title: strings.Title(order.Category),
			},

			Country: order.Country,
			City:    order.City,
			Zip:     order.Zip,
			Address: order.Address,
			Comment: order.Comment,
			Status:  order.Status,
		}
	}

	return pagination.PaginatedResponse(orderResponse, count, pageSize, currentPage), nil
}

func getUsersMap(users []*types.UserModel) map[string]*types.UserModel {
	usersMap := make(map[string]*types.UserModel)
	for _, user := range users {
		usersMap[user.Id] = user
	}
	return usersMap
}

func (s *OrderService) UpdateOrdersStatus(orderIds []string, status string) error {
	err := s.OrderRepository.UpdateOrdersStatus(orderIds, status)
	if err != nil {
		return err
	}
	return nil
}

func (s *OrderService) UpdateOrderStatus(orderId, status string) error {
	switch status {
	case "active":
		if err := s.canChangeToActive(orderId); err == nil {
			err := s.changeToActive(orderId)
			if err != nil {
				return err
			} else {
				return err
			}
		} else {
			return err
		}
	default:
		return fmt.Errorf("no such status: %s", status)
	}
}

func (s *OrderService) canChangeToActive(orderId string) error {
	orderData, err := s.OrderRepository.GetOrderById(orderId)
	if err != nil {
		return err
	}
	if orderData.Status != "pending" {
		return errors.New("you can set status to active only from pending")
	} else {
		return nil
	}
}

func (s *OrderService) changeToActive(orderId string) error {
	orderModel := types.OrderModel{
		Status:    "active",
		StartDate: time.Now(),
	}
	err := s.OrderRepository.UpdateOrder(orderId, orderModel)
	if err != nil {
		return err
	}
	return nil
}
