package meta

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	metaSvc "github.com/phoqer/api-gateway/services/meta"
	"github.com/phoqer/api-gateway/types"
)

type MetaHandlers struct {
	MetaService metaSvc.MetaServiceInterface
}

func NewMetaHandlers(MetaService metaSvc.MetaServiceInterface) *MetaHandlers {
	return &MetaHandlers{
		MetaService: MetaService,
	}
}

func (h *MetaHandlers) GetAuthorAnalytics(w http.ResponseWriter, r *http.Request) {
	response := types.AuthorAnalyticsResponse{
		Offers:        1,
		TotalRequests: 1,
		AverageScore:  5.0,
		Income:        0,
	}

	handlers.RespondWithJSON(w, http.StatusOK, response)
}

func (h *MetaHandlers) GetOfferMeta(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)
	offerId := chi.URLParam(r, "offerId")

	response, err := h.MetaService.GetOfferMeta(userId, offerId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, response)
}
