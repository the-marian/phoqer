package offers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/services/offer"
)

func TestGetOffersHandler(t *testing.T) {
	config := config.InitTestConfig()
	offerService := offer.NewFakeOfferService()

	offerHandlers := NewOfferHandlers(config, offerService)
	req, err := http.NewRequest("GET", "/offers?page=1&limit=10", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(offerHandlers.GetOffers)
	handler.ServeHTTP(rr, req)

	status := rr.Code
	if status != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, status)
	}

	expecteBody := `{"limit":10,"currentPage":1,"totalItems":20,"totalPages":2,"data":[{"id":"1","price":0,"title":"Apple","authorId":"123","category":"phones","image":""},{"id":"2","price":0,"title":"MacBook","authorId":"321","category":"laptops","image":""}]}`
	actualBody := rr.Body.String()
	if actualBody != expecteBody {
		t.Errorf("Expected response %s, got %s", expecteBody, actualBody)
	}
}

func TestGetAuthorOffersHandler(t *testing.T) {
	config := config.InitTestConfig()
	offerService := offer.NewFakeOfferService()

	offerHandlers := NewOfferHandlers(config, offerService)
	req, err := http.NewRequest("GET", "/offers/author?page=1&limit=10", nil)
	req = req.WithContext(context.WithValue(req.Context(), "user", "marian.zozulia@gmail.com"))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(offerHandlers.GetAuthorOffers)
	handler.ServeHTTP(rr, req)

	status := rr.Code
	if status != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, status)
	}

	expecteBody := `{"limit":10,"currentPage":1,"totalItems":20,"totalPages":2,"data":[{"id":"1","price":0,"title":"Apple","authorId":"marian.zozulia@gmail.com","category":"","image":""},{"id":"2","price":0,"title":"MacBook","authorId":"marian.zozulia@gmail.com","category":"","image":""}]}`
	actualBody := rr.Body.String()
	if actualBody != expecteBody {
		t.Errorf("Expected response %s, got %s", expecteBody, actualBody)
	}
}
