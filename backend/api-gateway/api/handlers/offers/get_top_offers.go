package offers

import (
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *OfferHandlers) GetTopOffers(w http.ResponseWriter, r *http.Request) {
	limit, err := handlers.GetLimit(r)
	if err != nil {
		limit = 14
	}
	offers, err := h.offerService.GetTopOffers(limit)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}
