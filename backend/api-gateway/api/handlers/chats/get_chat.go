package chats

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/repository/chat"
)

func (h *ChatHandlers) GetChatByUserId(w http.ResponseWriter, r *http.Request) {
	query := chat.Query{
		AuthorId: chi.URLParam(r, "userId"),
		ClientId: r.Context().Value("user").(string),
	}

	chatId, err := h.chatService.GetChatByUserId(query)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, chatId)
}
