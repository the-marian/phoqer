package auth

import (
	"errors"
	"log"
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/types"
)

func (h *AuthHandlers) Refresh(w http.ResponseWriter, r *http.Request) {
	rawRefreshToken, err := r.Cookie("refreshToken")
	if err != nil {
		log.Println("error occured while reading refreshToken from cookie")
		log.Println(err)
		handlers.RespondWithError(
			w,
			http.StatusBadRequest,
			errors.New("error occured while reading refreshToken from cookie"),
		)
		return
	}

	claims, err := h.authSevice.ParseJWT(rawRefreshToken.Value)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	accessToken, err := h.authSevice.CreateJWT(claims.Subject)
	if err != nil {
		log.Println(err)
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	refreshToken, err := h.authSevice.CreateRefreshJWT(claims.Subject)
	if err != nil {
		log.Println(err)
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	setTokenToCookie(w, refreshToken)
	handlers.RespondWithJSON(
		w,
		http.StatusOK,
		types.AuthResponse{
			Token:   accessToken,
			Expired: h.authSevice.GenerateTimestampWithOffset(2),
		},
	)
}
