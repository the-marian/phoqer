package orders

import (
	"errors"
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *OrderHandlers) GetAuthorOrders(w http.ResponseWriter, r *http.Request) {
	authorId := r.Context().Value("user").(string)
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	status := r.URL.Query().Get("status")
	if status == "" {
		handlers.RespondWithError(w, http.StatusBadRequest, errors.New("status query param is required"))
		return
	}

	orders, err := h.orderService.GetOrders(authorId, status, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, orders)
}
