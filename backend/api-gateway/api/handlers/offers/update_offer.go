package offers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *OfferHandlers) UpdateOfferHandler(w http.ResponseWriter, r *http.Request) {
	authorId := r.Context().Value("user").(string)
	offerId := chi.URLParam(r, "offerId")

	var offerData types.OfferRequest
	err := json.NewDecoder(r.Body).Decode(&offerData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	response, err := h.offerService.UpdateOffer(offerId, authorId, offerData)
	if err != nil {
		handlers.RespondWithJSON(w, http.StatusInternalServerError, err)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}
