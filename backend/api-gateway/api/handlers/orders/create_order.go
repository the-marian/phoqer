package orders

import (
	"encoding/json"
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/services/order"
	"github.com/phoqer/api-gateway/types"
)

type OrderHandlers struct {
	config       *config.Config
	orderService order.OrderServiceInterface
}

func NewOrderHandlers(
	config *config.Config,
	orderService order.OrderServiceInterface,
) *OrderHandlers {
	return &OrderHandlers{
		config:       config,
		orderService: orderService,
	}
}

func (h *OrderHandlers) CreateOrderHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)
	var orderData types.OrderRequest
	err := json.NewDecoder(r.Body).Decode(&orderData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	_, err = h.orderService.CreateOrder(userId, orderData)
	if err != nil {
		handlers.RespondWithJSON(w, http.StatusInternalServerError, err)
	}
	handlers.RespondWithJSON(w, http.StatusNoContent, nil)
}
