package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/markbates/goth"
	"github.com/markbates/goth/providers/facebook"
	"github.com/markbates/goth/providers/google"

	"github.com/phoqer/api-gateway/api"
	"github.com/phoqer/api-gateway/api/handlers/auth"
	"github.com/phoqer/api-gateway/api/handlers/categories"
	"github.com/phoqer/api-gateway/api/handlers/chats"
	"github.com/phoqer/api-gateway/api/handlers/healthchecks"
	mh "github.com/phoqer/api-gateway/api/handlers/media"
	"github.com/phoqer/api-gateway/api/handlers/meta"
	"github.com/phoqer/api-gateway/api/handlers/offers"
	"github.com/phoqer/api-gateway/api/handlers/orders"
	"github.com/phoqer/api-gateway/api/handlers/users"
	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/repository/category"
	"github.com/phoqer/api-gateway/repository/chat"
	"github.com/phoqer/api-gateway/repository/media"
	"github.com/phoqer/api-gateway/repository/offer"
	"github.com/phoqer/api-gateway/repository/order"
	"github.com/phoqer/api-gateway/repository/user"
	authSvc "github.com/phoqer/api-gateway/services/auth"
	categorySvc "github.com/phoqer/api-gateway/services/category"
	chatSvc "github.com/phoqer/api-gateway/services/chat"
	mediaSvc "github.com/phoqer/api-gateway/services/media"
	metaSvc "github.com/phoqer/api-gateway/services/meta"
	offerSvc "github.com/phoqer/api-gateway/services/offer"
	orderSvc "github.com/phoqer/api-gateway/services/order"
	userSvc "github.com/phoqer/api-gateway/services/user"
)

func main() {
	config := config.InitConfig()

	mongoDbClient := repository.NewMongoDBClient(config.MongoDbUri)
	authSvc := authSvc.NewAuthService(config)

	// initialisation for categories
	categoryRepo := category.NewCategoryRepository(config)
	categorySvc := categorySvc.NewCategoryService(config, categoryRepo)
	categoriesHdlr := categories.NewCategoryHandlers(config, categorySvc)

	// initialisation for healthchecks
	healthCheckHdlr := healthchecks.NewHealthCheckHandlers()

	// initialisation for users
	userRepo := user.NewUserRepository(mongoDbClient)
	userSvc := userSvc.NewUserService(userRepo)
	userHdlr := users.NewUserHandlers(userSvc)

	// initialisation for offers
	offerRepo := offer.NewOfferRepository(mongoDbClient)
	offerSvc := offerSvc.NewOfferService(offerRepo, userRepo)
	offersHdlr := offers.NewOfferHandlers(config, offerSvc)

	// initialisation for chats
	chatsCache := chatSvc.NewChatsCache()
	chatRepo := chat.NewChatRepository(mongoDbClient)
	chatSvc := chatSvc.NewChatService(chatRepo, userRepo, chatsCache)
	chatHdlr := chats.NewChatHandlers(chatSvc)

	// initialisation for orders
	orderRepo := order.NewOrderRepository(mongoDbClient)
	orderSvc := orderSvc.NewOrderService(
		categoryRepo,
		offerRepo,
		orderRepo,
		userRepo,
	)
	ordersHdlr := orders.NewOrderHandlers(config, orderSvc)

	// initialisation for meta
	metaSvc := metaSvc.NewMetaService(offerRepo)
	metaHdlr := meta.NewMetaHandlers(metaSvc)

	// initialisation for media uploads
	gcStorageClient, err := media.NewGCStorageClient(config)
	if err != nil {
		log.Fatalf("failed initialize Google Cloud Storage client: %v", err)
	}
	mediaRepo := media.NewMediaRepository(config, gcStorageClient)
	mediaSvc := mediaSvc.NewMediaService(mediaRepo)
	mediaHdlr := mh.NewMediaHandlers(mediaSvc)

	goth.UseProviders(
		google.New(
			config.GoogleClientId,
			config.GoogleSecretKey,
			config.GoogleCallbackUrl,
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		),
		facebook.New(
			config.FacebookClientId,
			config.FacebookSecretKey,
			config.FacebookCallbackUrl,
			"email",
			"public_profile",
		),
	)
	authHdlr := auth.NewAuthHandlers(userSvc, authSvc)

	r := api.GetRoutes(
		api.WithCORS(),
		api.WithLogger(),
		api.WithMeta(metaHdlr, authSvc),
		api.WithCategories(categoriesHdlr),
		api.WithChats(chatHdlr, authSvc),
		api.WithOffers(offersHdlr, authSvc),
		api.WithOrders(ordersHdlr, authSvc),
		api.WithUsers(userHdlr, authSvc),
		api.WithAuth(authHdlr),
		api.WithHealthChecks(healthCheckHdlr),
		api.WithUploads(mediaHdlr, authSvc),
	)
	log.Println("Routes list:")
	chi.Walk(
		r,
		func(method string, route string, _ http.Handler, middlewares ...func(http.Handler) http.Handler) error { //nolint:errcheck
			log.Printf("[%s]: '%s' has %d middlewares\n", method, route, len(middlewares))
			return nil
		},
	)
	log.Fatal(http.ListenAndServe(":8000", r))
}
