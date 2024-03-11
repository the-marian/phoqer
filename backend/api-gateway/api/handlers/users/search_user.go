package users

import (
	"net/http"
)

func (h *UserHandlers) SearchUsers(w http.ResponseWriter, r *http.Request) {
	// limit, page, err := handlers.GetLimitAndPage(r)
	// if err != nil {
	// 	handlers.RespondWithError(w, http.StatusBadRequest, err)
	// 	return
	// }
	//
	// query := r.URL.Query().Get("query")
	// accountType := r.URL.Query().Get("accountType")
	//
	// offers, err := h.offerService.SearchUsers(query, accountType, limit, page)
	// if err != nil {
	// 	handlers.RespondWithError(w, http.StatusInternalServerError, err)
	// 	return
	// }
	//
	// handlers.RespondWithJSON(w, http.StatusOK, offers)
}
