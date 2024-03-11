package offers

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/repository/offer"
)

func (h *OfferHandlers) GetOffers(w http.ResponseWriter, r *http.Request) {
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	query := &offer.QueryOptions{}
	category := r.URL.Query().Get("category")
	if category != "" {
		query.Category = category
	}
	offers, err := h.offerService.GetOffersByQuery(query, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, offers)
}

func (h *OfferHandlers) GetAuthorOffers(w http.ResponseWriter, r *http.Request) {
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	authorId := r.Context().Value("user").(string)
	offers, err := h.offerService.GetAuthorOffers(authorId, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}

func (h *OfferHandlers) GetOffersByCategory(w http.ResponseWriter, r *http.Request) {
	category := chi.URLParam(r, "category")
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	offers, err := h.offerService.GetOffersByCategory(category, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}

func (h *OfferHandlers) GetUserIdOffers(w http.ResponseWriter, r *http.Request) {
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	userId := chi.URLParam(r, "userId")
	offers, err := h.offerService.GetAuthorOffers(userId, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, offers)
}
