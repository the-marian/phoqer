package chat

import (
	"github.com/phoqer/api-gateway/repository/chat"
	"github.com/phoqer/api-gateway/types"
)

func NewFakeChatService() *ChatFakeService {
	return &ChatFakeService{}
}

type ChatFakeService struct{}

func GetChats(userId string) ([]*types.ChatResponse, error) {
	return nil, nil
}

func GetChatByUserId(query chat.Query) (string, error) {
	return "", nil
}
