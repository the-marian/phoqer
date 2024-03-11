package api

import (
	"github.com/go-chi/chi/v5"
	cm "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/markbates/goth/gothic"

	"github.com/phoqer/api-gateway/api/handlers/auth"
	"github.com/phoqer/api-gateway/api/handlers/categories"
	"github.com/phoqer/api-gateway/api/handlers/chats"
	"github.com/phoqer/api-gateway/api/handlers/healthchecks"
	"github.com/phoqer/api-gateway/api/handlers/media"
	"github.com/phoqer/api-gateway/api/handlers/meta"
	"github.com/phoqer/api-gateway/api/handlers/offers"
	"github.com/phoqer/api-gateway/api/handlers/orders"
	"github.com/phoqer/api-gateway/api/handlers/users"
	pm "github.com/phoqer/api-gateway/api/middleware"
	authSvc "github.com/phoqer/api-gateway/services/auth"
)

func WithOffers(h *offers.OfferHandlers, authSvc authSvc.AuthServiceInterface) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Get("/offers", h.GetOffers)
		r.Get("/offers/{offerId}", h.GetOfferById)
		r.Get("/offers/search", h.SearchOffers)
		r.Get("/offers/top", h.GetTopOffers)
		r.Delete("/offers/{offerId}", h.DeleteOffer)
		r.Delete("/offers/{offerId}/uploads", h.DeleteOfferPayload)
		r.Put("/offers/{offerId}/uploads", h.UpdateOfferPayload)
		r.With(pm.Authorization(authSvc)).Post("/offers", h.CreateOfferHandler)
		r.With(pm.Authorization(authSvc)).Put("/offers/{offerId}", h.UpdateOfferHandler)
		r.With(pm.Authorization(authSvc)).Get("/offers/author", h.GetAuthorOffers)
		r.With(pm.Authorization(authSvc)).Get("/offers/users/{userId}", h.GetUserIdOffers)
		r.With(pm.Authorization(authSvc)).Get("/offers/categories/{category}", h.GetOffersByCategory)
		r.With(pm.Authorization(authSvc)).Get("/favorite", h.GetFavoriteOffers)
	}
}

func WithOrders(h *orders.OrderHandlers, authService authSvc.AuthServiceInterface) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.With(pm.Authorization(authService)).Post("/orders", h.CreateOrderHandler)
		r.With(pm.Authorization(authService)).Get("/orders/author", h.GetAuthorOrders)
		r.Put("/status", h.UpdateOrdersStatus)
		r.With(pm.Authorization(authService)).Patch("/orders/{orderId}", h.UpdateOrderStatus)
	}
}

func WithUsers(h *users.UserHandlers, authService authSvc.AuthServiceInterface) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Post("/auth/join", h.CreateUser)
		r.With(pm.Authorization(authService)).Get("/users", h.GetCurrentUser)
		r.With(pm.Authorization(authService)).Get("/users/search", h.SearchUsers)
		r.With(pm.Authorization(authService)).Get("/users/{userId}", h.GetUserById)
		r.With(pm.Authorization(authService)).Post("/favorite/{offerId}", h.AddFavoriteOffer)
		r.With(pm.Authorization(authService)).Delete("/favorite/{offerId}", h.DeleteFavoriteOffer)
	}
}

func WithUploads(h *media.MediaUploadHandlers, authService authSvc.AuthServiceInterface) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.With(pm.Authorization(authService)).Post("/uploads", h.Uploads)
	}
}

func WithAuth(h *auth.AuthHandlers) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Post("/auth/login", h.Auth)
		r.Get("/auth", gothic.BeginAuthHandler)
		r.Get("/auth/callback", h.AuthCallbackHandler)
		r.Get("/auth/refresh", h.Refresh)
	}
}

func WithCategories(h *categories.CategoryHandlers) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Get("/categories", h.GetCategories)
		r.Get("/categories/{slug}", h.GetCategoryBySlug)
	}
}

func WithChats(h *chats.ChatHandlers, authService authSvc.AuthServiceInterface) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.With(pm.Authorization(authService)).Get("/chats", h.GetChats)
		r.With(pm.Authorization(authService)).Get("/chats/chat/{chatId}", h.Chat)
		r.With(pm.Authorization(authService)).Get("/chats/user/{userId}", h.GetChatByUserId)
		r.With(pm.Authorization(authService)).Get("/chats/{chatId}", h.GetMessages)
	}
}

func WithMeta(h *meta.MetaHandlers, authService authSvc.AuthServiceInterface) func(*chi.Mux) {
	metaRouter := chi.NewRouter()

	metaRouter.Use(pm.Authorization(authService))
	metaRouter.Get("/author", h.GetAuthorAnalytics)
	metaRouter.Get("/offers/{offerId}", h.GetOfferMeta)

	return func(r *chi.Mux) {
		r.Mount("/meta", metaRouter)
	}
}

func WithHealthChecks(h *healthchecks.HealthCheckHandlers) func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Get("/ping", h.PingPongHandler)
	}
}

func WithCORS() func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Use(cors.Handler(cors.Options{
			// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
			AllowedOrigins: []string{"https://phoqer.com", "https://api.phoqer.com", "http://localhost:3000"},
			// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: true,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		}))
	}
}

func WithLogger() func(*chi.Mux) {
	return func(r *chi.Mux) {
		r.Use(cm.Logger)
	}
}

func GetRoutes(options ...func(*chi.Mux)) *chi.Mux {
	r := chi.NewRouter()

	for _, o := range options {
		o(r)
	}
	return r
}
