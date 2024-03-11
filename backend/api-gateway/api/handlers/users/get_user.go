package users

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *UserHandlers) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)
	user, err := h.userService.GetUserById(userId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	response := types.UserResponse{
		Id:          user.Id,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		AccountType: user.AccountType,
		Avatar:      user.Avatar,
		CreatedAt:   user.CreatedAt,
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}

func (h *UserHandlers) GetUserById(w http.ResponseWriter, r *http.Request) {
	userId := chi.URLParam(r, "userId")
	user, err := h.userService.GetUserById(userId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}
	response := types.UserResponse{
		Id:          user.Id,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		AccountType: user.AccountType,
		Avatar:      user.Avatar,
		CreatedAt:   user.CreatedAt,
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}
