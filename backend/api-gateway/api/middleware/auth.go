package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/phoqer/api-gateway/services/auth"
)

func Authorization(as auth.AuthServiceInterface) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			// get token from header

			authorizationHeader := r.Header.Get("Authorization")
			if authorizationHeader == "" {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(`{"error":"Authorization header not provided"}`))
				return
			}
			parts := strings.Split(authorizationHeader, " ")
			if parts[0] != "Bearer" {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(`{"error":"Token type Bearer requered"}`))
				return
			}
			tokenIndex := 1
			claims, err := as.ParseJWT(parts[tokenIndex])
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(fmt.Sprintf(`{"error":"%v"}`, err)))
				return
			}
			if claims.Subject == "" {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(`{"error":"Subject of JWT payload can not be empty string"}`))
				return
			}
			ctx := context.WithValue(r.Context(), "user", claims.Subject)
			next.ServeHTTP(w, r.WithContext(ctx))
		}
		return http.HandlerFunc(fn)
	}
}
