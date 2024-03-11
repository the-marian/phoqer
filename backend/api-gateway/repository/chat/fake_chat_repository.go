package chat

import (
	"github.com/phoqer/api-gateway/types"
)

type FakeChatRepository struct{}

func NewFakeChatRepository() *FakeChatRepository {
	return &FakeChatRepository{}
}

func (r *FakeChatRepository) CreateChat(types.ChatModel) (string, error) {
	return "", nil
}

func (r *FakeChatRepository) GetChats(Query) ([]*types.ChatModel, error) {
	return []*types.ChatModel{}, nil
}

func (r *FakeChatRepository) CreateMessage(types.MessageModel) error {
	return nil
}
