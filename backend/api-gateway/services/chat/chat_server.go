package chat

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
	"github.com/phoqer/api-gateway/types"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

type Chat struct {
	Id         string
	Chats      ChatsCache
	Users      map[*User]bool
	Broadcast  chan []byte
	Register   chan *User
	Unregister chan *User
}

func NewChat(chatId string, chats ChatsCache) *Chat {
	return &Chat{
		Id:         chatId,
		Chats:      chats,
		Users:      make(map[*User]bool),
		Broadcast:  make(chan []byte),
		Register:   make(chan *User),
		Unregister: make(chan *User),
	}
}

type User struct {
	Id   string
	Chat *Chat
	Conn *websocket.Conn
	Send chan []byte
}

func (c *Chat) Serve() {
	for {
		select {
		case user := <-c.Register:
			c.Users[user] = true
		case user := <-c.Unregister:
			if _, ok := c.Users[user]; ok {
				delete(c.Users, user)
				close(user.Send)
			}

			if len(c.Users) == 0 {
				delete(c.Chats, c.Id)
			}
		case msg := <-c.Broadcast:
			for user := range c.Users {
				select {
				case user.Send <- msg:
				default:
					close(user.Send)
					delete(c.Users, user)
				}
			}
		}
	}
}

func (u *User) readPump(s ChatServiceInterface) {
	defer func() {
		u.Chat.Unregister <- u
		u.Conn.Close()
	}()
	u.Conn.SetReadLimit(maxMessageSize)
	u.Conn.SetReadDeadline(time.Now().Add(pongWait))
	u.Conn.SetPongHandler(func(string) error { u.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := u.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		msgModel, err := parseMsg(message)
		if err != nil {
			u.Send <- formatErrorMsg(err)
			continue
		}

		msgResponse, err := s.CreateMessage(msgModel, u)
		if err != nil {
			u.Send <- formatErrorMsg(err)
			continue
		}

		msg, err := json.Marshal(msgResponse)
		if err != nil {
			u.Send <- formatErrorMsg(err)
			continue
		}
		u.Chat.Broadcast <- msg
	}
}

func parseMsg(rawMsg []byte) (*types.MessageModel, error) {
	rawMsg = bytes.TrimSpace(rawMsg)
	var m types.MessageModel
	err := json.Unmarshal(rawMsg, &m)
	if err != nil {
		return nil, err
	}
	return &m, nil
}

func formatErrorMsg(err error) []byte {
	return []byte(fmt.Sprintf(`{"info": "курва, якщо ти нас хацкаєш, я тебе по айпі вичислю 🫵", "error": "%s"}`, err.Error()))
}

func (u *User) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		u.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-u.Send:
			u.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				u.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := u.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(u.Send)
			for i := 0; i < n; i++ {
				w.Write(<-u.Send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			u.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := u.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
