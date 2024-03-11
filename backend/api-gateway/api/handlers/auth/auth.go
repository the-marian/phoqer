package auth

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/phoqer/api-gateway/api/handlers"
	authSvc "github.com/phoqer/api-gateway/services/auth"
	userSvc "github.com/phoqer/api-gateway/services/user"
	"github.com/phoqer/api-gateway/types"
)

type AuthHandlers struct {
	userService userSvc.UserServiceInterface
	authSevice  *authSvc.AuthService
}

func NewAuthHandlers(
	userService userSvc.UserServiceInterface,
	authSevice *authSvc.AuthService,
) *AuthHandlers {
	return &AuthHandlers{
		userService: userService,
		authSevice:  authSevice,
	}
}

func (h *AuthHandlers) Auth(w http.ResponseWriter, r *http.Request) {
	var loginData types.AuthRequest
	err := json.NewDecoder(r.Body).Decode(&loginData)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	userData, err := h.userService.GetUserByEmail(loginData.Email)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	if !authSvc.CheckPasswordHash(userData.PasswordHash, loginData.Password) {
		handlers.RespondWithError(
			w,
			http.StatusBadRequest,
			errors.New("auth failed. Please confirm your credentials and try again"),
		)
		return
	}

	accessToken, err := h.authSevice.CreateJWT(userData.Id)
	if err != nil {
		log.Println(err)
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	refreshToken, err := h.authSevice.CreateRefreshJWT(userData.Id)
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

func setTokenToCookie(w http.ResponseWriter, token string) {
	cookie := http.Cookie{
		Name:     "refreshToken",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24 * 30),
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		Domain:   "phoqer.com",
	}
	http.SetCookie(w, &cookie)
}
