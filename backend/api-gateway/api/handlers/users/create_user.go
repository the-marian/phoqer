package users

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/services/user"
	"github.com/phoqer/api-gateway/types"
)

type UserHandlers struct {
	userService user.UserServiceInterface
}

func NewUserHandlers(userService user.UserServiceInterface) *UserHandlers {
	return &UserHandlers{
		userService: userService,
	}
}

func (h *UserHandlers) CreateUser(w http.ResponseWriter, r *http.Request) {
	var userData types.UserRequest
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	userId, err := h.userService.CreateUser(userData)
	if err != nil {
		if err == user.ErrUserAlreadyExist {
			handlers.RespondWithError(w, http.StatusBadRequest, err)
			return
		}
		if err == user.ErrUserEmailIsEmptyField {
			handlers.RespondWithError(w, http.StatusBadRequest, err)
			return
		}
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, struct {
		UserId string `json:"userId"`
	}{
		UserId: userId,
	})
}

func (h *UserHandlers) AddFavoriteOffer(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)
	offerId := chi.URLParam(r, "offerId")

	err := h.userService.AddFavoriteOffer(userId, offerId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusNoContent, nil)
}

func (h *UserHandlers) DeleteFavoriteOffer(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)
	offerId := chi.URLParam(r, "offerId")

	err := h.userService.DeleteFavoriteOffer(userId, offerId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusNoContent, nil)
}
