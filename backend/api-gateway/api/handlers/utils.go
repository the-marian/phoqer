package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
)

func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func RespondWithError(w http.ResponseWriter, code int, err error) {
	RespondWithJSON(w, code, struct {
		Error string `json:"error"`
	}{
		Error: err.Error(),
	})
}

func GetLimitAndPage(r *http.Request) (limit int, page int, err error) {
	limitQueryParam := r.URL.Query().Get("limit")
	limit, err = strconv.Atoi(limitQueryParam)
	if err != nil {
		return 0, 0, errors.New("error parsing 'limit' query param")
	}

	pageQueryParam := r.URL.Query().Get("page")
	if pageQueryParam == "" {
		return limit, 1, nil
	}
	page, err = strconv.Atoi(pageQueryParam)
	if err != nil {
		return 0, 1, errors.New("error parsing 'page' query param")
	}

	return limit, page, nil
}

func GetSearchQuery(r *http.Request) (string, error) {
	query := r.URL.Query().Get("query")
	if query == "" {
		return "", errors.New("error parsing 'query' query param")
	}
	return query, nil
}

func GetLimit(r *http.Request) (limit int, err error) {
	limitQueryParam := r.URL.Query().Get("limit")
	limit, err = strconv.Atoi(limitQueryParam)
	if err != nil {
		return 0, errors.New("error parsing limit query param")
	}
	return limit, nil
}
