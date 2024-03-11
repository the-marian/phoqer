package offers

import (
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *OfferHandlers) GetFavoriteOffers(w http.ResponseWriter, r *http.Request) {
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	userId := r.Context().Value("user").(string)
	offers, err := h.offerService.GetFavoriteOffers(userId, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}
