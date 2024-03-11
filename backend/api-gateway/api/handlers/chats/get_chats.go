package chats

import (
	"net/http"

	"github.com/phoqer/api-gateway/api/handlers"
	chatSvc "github.com/phoqer/api-gateway/services/chat"
)

type ChatHandlers struct {
	chatService chatSvc.ChatServiceInterface
}

func NewChatHandlers(
	chatService chatSvc.ChatServiceInterface,
) *ChatHandlers {
	return &ChatHandlers{
		chatService: chatService,
	}
}

func (h *ChatHandlers) GetChats(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(string)

	chats, err := h.chatService.GetChats(userId)
	if err != nil {
		handlers.RespondWithError(w, http.StatusInternalServerError, err)
		return
	}

	handlers.RespondWithJSON(w, http.StatusOK, chats)
}
