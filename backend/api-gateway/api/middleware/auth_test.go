package middleware

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/services/auth"
)

func TestAuthorizationMiddleware(t *testing.T) {
	config := config.InitTestConfig()
	config.SecretKey = "dupa"
	config.AccessTokenLife = time.Minute * 10
	authService := auth.NewAuthService(config)
	user := "user@gmail.com"
	validToken, _ := authService.CreateJWT(user)
	validTokenButEmptySub, _ := authService.CreateJWT("")
	invalidToken := "dupa"

	testCases := []struct {
		name                string
		authorizationHeader [2]string
		expectedCode        int
		expectedUser        string
	}{
		{
			"Happy path",
			[2]string{"Authorization", fmt.Sprintf("Bearer %s", validToken)},
			http.StatusOK,
			user,
		},
		{
			"Subject is empty string",
			[2]string{"Authorization", fmt.Sprintf("Bearer %s", validTokenButEmptySub)},
			http.StatusBadRequest,
			"",
		},
		{
			"No Authorization header",
			[2]string{"", ""},
			http.StatusBadRequest,
			"",
		},
		{
			"Token not type Bearer",
			[2]string{"Authorization", fmt.Sprintf("Dupa %s", validToken)},
			http.StatusBadRequest,
			"",
		},
		{
			"Invalid token",
			[2]string{"Authorization", fmt.Sprintf("Bearer %s", invalidToken)},
			http.StatusBadRequest,
			"",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest("GET", "/", nil)
			req.Header.Set(tc.authorizationHeader[0], tc.authorizationHeader[1])
			res := httptest.NewRecorder()

			handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				w.WriteHeader(http.StatusOK)
				user := r.Context().Value("user")
				if user != tc.expectedUser {
					t.Errorf("Expected user %s, but got %s", tc.expectedUser, user)
				}
			})

			middleware := Authorization(authService)(handler)
			middleware.ServeHTTP(res, req)
			log.Println(res.Body)

			if res.Code != tc.expectedCode {
				t.Errorf("Expected status %d, but got %d", tc.expectedCode, res.Code)
			}
		})
	}
}
