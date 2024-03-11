package orders

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *OrderHandlers) UpdateOrdersStatus(w http.ResponseWriter, r *http.Request) {
	var orderData types.ChangeOrdersStatusRequest
	err := json.NewDecoder(r.Body).Decode(&orderData)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	err = h.orderService.UpdateOrdersStatus(orderData.Ids, orderData.Status)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, nil)
}

func (h *OrderHandlers) UpdateOrderStatus(w http.ResponseWriter, r *http.Request) {
	var orderData types.ChangeOrderStatusRequest
	orderId := chi.URLParam(r, "orderId")
	err := json.NewDecoder(r.Body).Decode(&orderData)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	err = h.orderService.UpdateOrderStatus(orderId, orderData.Status)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, nil)
}
