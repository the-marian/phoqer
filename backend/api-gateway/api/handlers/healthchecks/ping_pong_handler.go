package healthchecks

import "net/http"

type HealthCheckHandlers struct{}

func NewHealthCheckHandlers() *HealthCheckHandlers {
	return &HealthCheckHandlers{}
}

func (h HealthCheckHandlers) PingPongHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
