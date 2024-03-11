package types

import "time"

type ChatResponse struct {
	Id          string           `json:"id"`
	AuthorId    string           `json:"authorId"`
	ClientId    string           `json:"clientId"`
	CreatedAt   time.Time        `json:"createdAt"`
	Image       string           `json:"userImage"`
	Name        string           `json:"name"`
	LastMessage *MessageResponse `json:"lastMessage"`
	NewMessages bool             `json:"newMessages"`
}

type MessageRequest struct {
	Message string   `json:"message"`
	Uploads []string `json:"uploads"`
}

type MessageResponse struct {
	Id          string    `json:"id"`
	CreatedAt   time.Time `json:"createdAt"`
	IsRead      bool      `json:"isRead"`
	Message     string    `json:"message"`
	MessageType string    `json:"messageType"`
	Uploads     []string  `json:"uploads"`
	UserId      string    `json:"userId"`
}
