package healthchecks

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

var healthcheckHandlers *HealthCheckHandlers

func TestMain(m *testing.M) {
	healthcheckHandlers = NewHealthCheckHandlers()
}

func TestPingPongHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/ping", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(healthcheckHandlers.PingPongHandler)
	handler.ServeHTTP(rr, req)

	status := rr.Code
	if status != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, status)
	}

	expected_body := "pong"
	if rr.Body.String() != expected_body {
		t.Errorf("Expected pong, got %s", expected_body)
	}
}
