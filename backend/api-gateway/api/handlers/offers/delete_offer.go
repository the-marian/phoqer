package offers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *OfferHandlers) DeleteOffer(w http.ResponseWriter, r *http.Request) {
	offerId := chi.URLParam(r, "offerId")
	offer := h.offerService.DeleteOffer(offerId)
	handlers.RespondWithJSON(w, http.StatusOK, offer)
}
