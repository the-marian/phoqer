package chats

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/phoqer/api-gateway/api/handlers"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (h *ChatHandlers) Chat(w http.ResponseWriter, r *http.Request) {
	chatId := chi.URLParam(r, "chatId")
	userId := r.Context().Value("user").(string)

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	h.chatService.Run(conn, chatId, userId)
}
