package chats

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/phoqer/api-gateway/api/handlers"
)

func (h *ChatHandlers) GetMessages(w http.ResponseWriter, r *http.Request) {
	chatId := chi.URLParam(r, "chatId")
	limit, page, err := handlers.GetLimitAndPage(r)
	if err != nil {
		handlers.RespondWithError(w, http.StatusBadRequest, err)
		return
	}

	messages, err := h.chatService.GetMessages(chatId, limit, page)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, messages)
}
