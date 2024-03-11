package chat

import (
	"errors"
	"time"

	"github.com/gorilla/websocket"
	"github.com/phoqer/api-gateway/repository/chat"
	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/services/pagination"
	"github.com/phoqer/api-gateway/types"
)

type ChatServiceInterface interface {
	CreateMessage(*types.MessageModel, *User) (*types.MessageResponse, error)
	GetChats(userId string) ([]*types.ChatResponse, error)
	GetMessages(chatId string, pageSize, currentPage int) (*types.PaginatedResponse, error)
	Run(conn *websocket.Conn, chatId string, userId string)
	GetChatByUserId(query chat.Query) (string, error)
}

func NewChatService(
	chatRepository chat.ChatRepositoryInterface,
	userRepository user.UserRepositoryInterface,
	chats ChatsCache,
) *ChatService {
	return &ChatService{
		ChatRepository: chatRepository,
		UserRepository: userRepository,
		ChatsCache:     chats,
	}
}

type ChatService struct {
	ChatRepository chat.ChatRepositoryInterface
	UserRepository user.UserRepositoryInterface
	ChatsCache     ChatsCache
}

func (s *ChatService) CreateMessage(m *types.MessageModel, u *User) (*types.MessageResponse, error) {
	m.UserId = u.Id
	m.ChatId = u.Chat.Id
	if len(u.Chat.Users) == 2 {
		m.IsRead = true
	} else {
		m.IsRead = false
	}
	m.MessageType = "regular"
	m.CreatedAt = time.Now()

	id, err := s.ChatRepository.CreateMessage(m)
	if err != nil {
		return nil, err
	}
	if err != nil {
		u.Send <- formatErrorMsg(err)
	}

	r := &types.MessageResponse{
		Id:          id,
		CreatedAt:   m.CreatedAt,
		IsRead:      m.IsRead,
		Message:     m.Message,
		MessageType: m.MessageType,
		Uploads:     m.Uploads,
		UserId:      m.UserId,
	}

	return r, nil
}

func (s *ChatService) GetMessages(chatId string, pageSize, currentPage int) (*types.PaginatedResponse, error) {
	messages, err := s.ChatRepository.GetMessages(chatId, pageSize, currentPage)
	if err != nil {
		return nil, err
	}

	var items []types.MessageResponse

	for _, message := range messages {
		items = append(items, types.MessageResponse{
			Id:          message.Id,
			CreatedAt:   message.CreatedAt,
			IsRead:      message.IsRead,
			Message:     message.Message,
			MessageType: message.MessageType,
			Uploads:     message.Uploads,
			UserId:      message.UserId,
		})
	}

	itemsCount, err := s.ChatRepository.CountMessages(chatId)

	return pagination.PaginatedResponse(items, itemsCount, pageSize, currentPage), nil
}

func (s *ChatService) GetChats(userId string) ([]*types.ChatResponse, error) {
	user, err := s.UserRepository.GetUserById(userId)
	if err != nil {
		return nil, err
	}

	query := chat.Query{}

	switch user.AccountType {
	case "client":
		query.ClientId = userId
	case "author":
		query.AuthorId = userId
	default:
		return nil, errors.New("Invalid account type")
	}
	chats, err := s.ChatRepository.GetChats(query)
	if err != nil {
		return nil, err
	}

	var usersIds []string

	// create users list
	for _, chat := range chats {
		switch user.AccountType {
		case "client":
			usersIds = append(usersIds, chat.AuthorId)
		case "author":
			usersIds = append(usersIds, chat.ClientId)
		default:
			return nil, errors.New("Invalid account type")
		}
	}
	usersData, err := s.UserRepository.GetUsers(usersIds)
	if err != nil {
		return nil, err
	}

	userIdNameMap := make(map[string]*types.UserModel)

	for _, user := range usersData {
		userIdNameMap[user.Id] = user
	}

	var chatsResponse []*types.ChatResponse

	for _, chat := range chats {

		var chatUser *types.UserModel

		switch user.AccountType {
		case "client":
			chatUser = userIdNameMap[chat.AuthorId]
		case "author":
			chatUser = userIdNameMap[chat.ClientId]
		default:
			return nil, errors.New("Invalid account type")
		}

		chatResponse := &types.ChatResponse{
			Id:        chat.Id,
			AuthorId:  chat.AuthorId,
			ClientId:  chat.ClientId,
			CreatedAt: chat.CreatedAt,
			Name:      getFullName(chatUser),
			Image:     chatUser.Avatar,
		}
		chatsResponse = append(chatsResponse, chatResponse)
	}

	return chatsResponse, nil
}

func getFullName(user *types.UserModel) string {
	return user.FirstName + " " + user.LastName
}

func (s *ChatService) Run(conn *websocket.Conn, chatId string, userId string) {
	chat := s.ChatsCache.Get(chatId)
	go chat.Serve()

	user := &User{
		Id:   userId,
		Chat: chat,
		Conn: conn,
		Send: make(chan []byte, 256),
	}

	chat.Register <- user

	go user.writePump()
	go user.readPump(s)
}

func (s *ChatService) GetChatByUserId(query chat.Query) (string, error) {
	chat, err := s.ChatRepository.GetChats(query)
	if err != nil {
		return "", err
	}
	if len(chat) == 0 {
		chatModel := types.ChatModel{
			AuthorId: query.AuthorId,
			ClientId: query.ClientId,
		}
		newChatId, err := s.ChatRepository.CreateChat(chatModel)
		if err != nil {
			return "", err
		}
		return newChatId, nil
	}
	return chat[0].Id, nil
}
