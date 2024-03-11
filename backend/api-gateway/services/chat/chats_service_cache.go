package chat

type ChatsCache map[string]*Chat

func NewChatsCache() ChatsCache {
	return make(map[string]*Chat)
}

func (c ChatsCache) Get(chatId string) *Chat {
	var chat *Chat
	var ok bool

	if chat, ok = c[chatId]; !ok {
		chat = NewChat(chatId, c)
		c[chatId] = chat
		return chat
	}
	return chat
}
