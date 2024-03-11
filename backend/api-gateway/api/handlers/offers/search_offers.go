package offers

import (
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *OfferHandlers) SearchOffers(w http.ResponseWriter, r *http.Request) {
	query, err := handlers.GetSearchQuery(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	offers, err := h.offerService.SearchOffers(query)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}
