package chat

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"

	"github.com/phoqer/api-gateway/repository"
	"github.com/phoqer/api-gateway/types"
)

var chatRepo *ChatRepository

func TestMain(m *testing.M) {
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("Could not construct pool: %s", err)
	}

	err = pool.Client.Ping()
	if err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}

	// pull mongodb docker image for version 5.0
	resource, err := pool.RunWithOptions(&dockertest.RunOptions{
		Repository: "mongo",
		Tag:        "5.0",
		Env: []string{
			// username and password for mongodb superuser
			"MONGO_INITDB_ROOT_USERNAME=root",
			"MONGO_INITDB_ROOT_PASSWORD=password",
		},
	}, func(config *docker.HostConfig) {
		// set AutoRemove to true so that stopped container goes away by itself
		config.AutoRemove = true
		config.RestartPolicy = docker.RestartPolicy{
			Name: "no",
		}
	})
	if err != nil {
		log.Fatalf("Could not start resource: %s", err)
	}

	// exponential backoff-retry, because the application in the container might not be ready to accept connections yet
	err = pool.Retry(func() error {
		client := repository.NewMongoDBClient(
			fmt.Sprintf("mongodb://root:password@localhost:%s", resource.GetPort("27017/tcp")),
		)
		chatRepo = NewChatRepository(client)
		return chatRepo.client.Ping(context.Background(), nil)
	})

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}
	// run tests
	code := m.Run()

	// disconnect mongodb client
	if err = chatRepo.client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}

	// When you're done, kill and remove the container
	if err = pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	os.Exit(code)
}

func TestCreateChat(t *testing.T) {
	chat := types.ChatModel{
		AuthorId: "74d77a657f6598b200c47077",
		ClientId: "74d77a657f6598b200c47077",
	}
	_, err := chatRepo.CreateChat(chat)
	if err != nil {
		t.Error(err)
	}
}

func TestCreateMessage(t *testing.T) {
	m := &types.MessageModel{
		ChatId:      "74d77a657f6598b200c47077",
		IsRead:      false,
		Message:     "Hello",
		MessageType: "text",
		Uploads:     []string{},
		UserId:      "74d77a657f6598b200c47077",
	}
	id, err := chatRepo.CreateMessage(m)
	if err != nil {
		t.Error(err)
	}
	if id == "" {
		t.Error("id is empty, something went wrong")
	}
}

func TestGetMessages(t *testing.T) {
	chat := types.ChatModel{
		AuthorId: "74d77a657f6598b200c47077",
		ClientId: "74d77a657f6598b200c47077",
	}
	chatId, err := chatRepo.CreateChat(chat)
	if err != nil {
		t.Error(err)
	}
	for i := 0; i < 13; i++ {
		m := &types.MessageModel{
			ChatId:  chatId,
			Message: fmt.Sprintf("Hello %d", i),
			UserId:  "74d77a657f6598b200c47077",
		}
		_, err := chatRepo.CreateMessage(m)
		if err != nil {
			t.Error(err)
		}
	}

	messages, err := chatRepo.GetMessages(chatId, 10, 2)
	log.Println(messages)
	if err != nil {
		t.Error(err)
	}
	if len(messages) != 3 {
		t.Errorf("Expected 3 messages, got %d messages instead", len(messages))
	}
}
