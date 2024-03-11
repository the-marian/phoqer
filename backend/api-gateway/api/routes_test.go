package api

import (
	"net/http"
	"testing"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers/categories"
	"github.com/phoqer/api-gateway/api/handlers/healthchecks"
	"github.com/phoqer/api-gateway/api/handlers/offers"
	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/repository/category"
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/services/auth"
	categorySvc "github.com/phoqer/api-gateway/services/category"
	offerSvc "github.com/phoqer/api-gateway/services/offer"
)

var r *chi.Mux

func TestMain(m *testing.M) {
	config := config.InitTestConfig()
	authService := auth.NewAuthService(config)

	// initialisation for categories
	categoryRepository := category.NewCategoryRepository(config)
	categoryService := categorySvc.NewCategoryService(config, categoryRepository)
	categoriesHandlers := categories.NewCategoryHandlers(config, categoryService)

	// initialisation for healthchecks
	healthCheckHandlers := healthchecks.NewHealthCheckHandlers()

	// initialisation for users
	userRepository := user.NewFakeUserRepository()

	// initialisation for offers
	offerRepository := offer.NewFakeOfferRepository()
	offerService := offerSvc.NewOfferService(offerRepository, userRepository)
	offersHandlers := offers.NewOfferHandlers(config, offerService)

	r = GetRoutes(
		WithCORS(),
		WithCategories(categoriesHandlers),
		WithOffers(offersHandlers, authService),
		WithHealthChecks(healthCheckHandlers),
	)
	m.Run()
}

func TestRoutes(t *testing.T) {
	tests := []struct {
		route  string
		method string
	}{
		{"/ping", "GET"},
		{"/categories", "GET"},
		{"/offers", "GET"},
		{"/offers", "POST"},
	}
	for _, test := range tests {
		if !routeExist(test.method, test.route, r) {
			t.Errorf("Route %s %s not found", test.method, test.route)
		}
	}
}

func routeExist(testMethod string, testRoute string, chiRoutes chi.Routes) bool {
	found := false
	chi.Walk(
		chiRoutes,
		func(method string, route string, _ http.Handler, _ ...func(http.Handler) http.Handler) error { //nolint:errcheck
			if route == testRoute && method == testMethod {
				found = true
			}
			return nil
		},
	)
	return found
}
