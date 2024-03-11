package offers

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/config"
	offerSvc "github.com/phoqer/api-gateway/services/offer"
)

type OfferHandlers struct {
	config       *config.Config
	offerService offerSvc.OfferServiceInterface
}

func NewOfferHandlers(
	config *config.Config,
	offerService offerSvc.OfferServiceInterface,
) *OfferHandlers {
	return &OfferHandlers{
		config:       config,
		offerService: offerService,
	}
}

func (h *OfferHandlers) GetOfferById(w http.ResponseWriter, r *http.Request) {
	offerId := chi.URLParam(r, "offerId")
	offer, err := h.offerService.GetOfferById(offerId)
	if err == offerSvc.ErrOfferIdDoesNotExist {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	} else if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, offer)
}
