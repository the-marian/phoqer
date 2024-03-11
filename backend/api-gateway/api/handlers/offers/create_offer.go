package offers

import (
	"encoding/json"
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *OfferHandlers) CreateOfferHandler(w http.ResponseWriter, r *http.Request) {
	authorId := r.Context().Value("user").(string)
	var offerData types.OfferRequest
	err := json.NewDecoder(r.Body).Decode(&offerData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newOffer, err := h.offerService.CreateOffer(authorId, offerData)
	if err != nil {
		handlers.RespondWithJSON(w, http.StatusInternalServerError, err)
	}
	handlers.RespondWithJSON(w, http.StatusOK, newOffer)
}
