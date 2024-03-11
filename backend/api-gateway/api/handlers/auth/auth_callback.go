package auth

import (
	"fmt"
	"net/http"

	"github.com/markbates/goth/gothic"

	"github.com/phoqer/api-gateway/api/handlers"
	userSvc "github.com/phoqer/api-gateway/services/user"
	"github.com/phoqer/api-gateway/types"
)

func (h *AuthHandlers) AuthCallbackHandler(w http.ResponseWriter, req *http.Request) {
	gothUser, err := gothic.CompleteUserAuth(w, req)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	// chack if user does not exist thant create new user
	userData, err := h.userService.GetUserByEmail(gothUser.Email)
	if err == userSvc.ErrUserDoesNotExist {
		newUser := types.UserRequest{
			Email:     gothUser.Email,
			FirstName: gothUser.FirstName,
			LastName:  gothUser.LastName,
			Avatar:    gothUser.AvatarURL,
		}
		_, err := h.userService.CreateUser(newUser)
		if err != nil {
			handlers.RespondWithError(w, http.StatusBadRequest, err)
			return
		}
	} else if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	accessToken, err := h.authSevice.CreateJWT(userData.Id)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}
	refreshToken, err := h.authSevice.CreateRefreshJWT(userData.Id)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	setTokenToCookie(w, refreshToken)

	expires := h.authSevice.GenerateTimestampWithOffset(2)
	redirectUrl := fmt.Sprintf("https://phoqer.com/oauth?token=%s&expired=%d", accessToken, expires)
	http.Redirect(w, req, redirectUrl, http.StatusFound)
}
