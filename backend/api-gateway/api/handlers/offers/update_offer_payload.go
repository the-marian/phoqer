package offers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *OfferHandlers) UpdateOfferPayload(w http.ResponseWriter, r *http.Request) {
	offerId := chi.URLParam(r, "offerId")
	var offerPayload types.OfferPayloadRequest
	err := json.NewDecoder(r.Body).Decode(&offerPayload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	response, err := h.offerService.UpdateOfferPayload(offerId, offerPayload.Images)
	if err != nil {
		handlers.RespondWithJSON(w, http.StatusInternalServerError, err)
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}
