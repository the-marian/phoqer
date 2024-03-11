package order

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"
	"time"

	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

var orderRepo *OrderRepository

func TestMain(m *testing.M) {
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("Could not construct pool: %s", err)
	}

	err = pool.Client.Ping()
	if err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}

	// pull mongodb docker image for version 5.0
	resource, err := pool.RunWithOptions(&dockertest.RunOptions{
		Repository: "mongo",
		Tag:        "5.0",
		Env: []string{
			// username and password for mongodb superuser
			"MONGO_INITDB_ROOT_USERNAME=root",
			"MONGO_INITDB_ROOT_PASSWORD=password",
		},
	}, func(config *docker.HostConfig) {
		// set AutoRemove to true so that stopped container goes away by itself
		config.AutoRemove = true
		config.RestartPolicy = docker.RestartPolicy{
			Name: "no",
		}
	})
	if err != nil {
		log.Fatalf("Could not start resource: %s", err)
	}

	// exponential backoff-retry, because the application in the container might not be ready to accept connections yet
	err = pool.Retry(func() error {
		client := repository.NewMongoDBClient(
			fmt.Sprintf("mongodb://root:password@localhost:%s", resource.GetPort("27017/tcp")),
		)
		orderRepo = NewOrderRepository(client)
		return orderRepo.client.Ping(context.Background(), nil)
	})

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}
	// run tests
	code := m.Run()

	// disconnect mongodb client
	if err = orderRepo.client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}

	// When you're done, kill and remove the container
	if err = pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	os.Exit(code)
}

func TestGetOrders(t *testing.T) {
	// create 13 orders
	for i := 0; i < 13; i++ {
		order := types.OrderModel{
			OfferId:  "74d77a657f6598b200c47077",
			AuthorId: "74d77a657f6598b200c47077",
			ClientId: "74d77a657f6598b200c47077",
			Country:  "Ukraine",
			City:     "Kyiv",
			Zip:      "04211",
			Address:  "werqwer",
		}
		_, err := orderRepo.CreateOrder(order)
		if err != nil {
			t.Error(err)
		}
	}

	query := &QueryOptions{
		Status: "pending",
	}
	orders, err := orderRepo.GetOrders(query, 10, 2)
	log.Println(orders)
	if err != nil {
		t.Error(err)
	}
	if len(orders) != 3 {
		t.Errorf("Expected 3 orders, got %d", len(orders))
	}
}

func TestCreateOrder(t *testing.T) {
	order := types.OrderModel{
		OfferId:  "74d77a657f6598b200c47077",
		AuthorId: "74d77a657f6598b200c47077",
		ClientId: "74d77a657f6598b200c47077",
		Country:  "Ukraine",
		City:     "Kyiv",
		Zip:      "04211",
		Address:  "werqwer",
	}
	_, err := orderRepo.CreateOrder(order)
	if err != nil {
		t.Error(err)
	}
}

func TestUpdateOrderClient(t *testing.T) {
	var orderIds []string
	order1 := types.OrderModel{
		Id:      "5678765",
		OfferId: "133",
		Country: "Ukraine",
		City:    "Kyiv",
		Zip:     "04211",
		Address: "werqwer",
	}
	orderId1, err := orderRepo.CreateOrder(order1)
	if err != nil {
		t.Error(err)
	}
	order2 := types.OrderModel{
		Id:      "1234327",
		OfferId: "167",
		Country: "Ukraine",
		City:    "Kyiv",
		Zip:     "04211",
		Address: "werqwer1",
	}
	orderId2, err := orderRepo.CreateOrder(order2)
	if err != nil {
		t.Error(err)
	}
	order3 := types.OrderModel{
		Id:      "1234329",
		OfferId: "154",
		Country: "Ukraine",
		City:    "Kyiv",
		Zip:     "04211",
		Address: "werqwer2",
	}
	orderId3, err := orderRepo.CreateOrder(order3)
	if err != nil {
		t.Error(err)
	}
	orderIds = append(orderIds, orderId1, orderId2, orderId3)
	err = orderRepo.UpdateOrdersStatus(orderIds, "rejected")
	if err != nil {
		t.Error(err)
	}
	orders, err := orderRepo.GetOrdersByIds(orderIds)
	if err != nil {
		t.Error(err)
	}
	for _, order := range orders {
		log.Println(order)
		if order.Status != "rejected" {
			t.Errorf("Expected order status to be rejected, got %v", order.Status)
		}
	}
}

func TestUpdateOrder(t *testing.T) {
	var newList []string
	newTime := time.Date(0001, 2, 1, 00, 00, 00, 00, time.UTC)
	order := types.OrderModel{
		Id:      "5678763",
		OfferId: "121",
		Country: "Ukraine",
		City:    "Kyiv",
		Zip:     "04211",
		Address: "ae43es",
	}
	orderId, err := orderRepo.CreateOrder(order)
	if err != nil {
		t.Error(err)
	}
	updateData := types.OrderModel{
		Status:    "Active",
		StartDate: newTime,
	}
	err = orderRepo.UpdateOrder(orderId, updateData)
	if err != nil {
		t.Error(err)
	}
	newList = append(newList, orderId)
	getOrder, err := orderRepo.GetOrdersByIds(newList)
	if err != nil {
		t.Error(err)
	}
	for _, value := range getOrder {
		if value.Status != "Active" {
			t.Errorf("Expected order status to be Active, got %v", value.Status)
		}
		if !value.StartDate.Equal(newTime) {
			t.Errorf("Expected time to be equal %v, got %v", newTime, order.StartDate)
		}
	}
}
