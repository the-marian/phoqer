package media

import (
	"context"

	"cloud.google.com/go/storage"
	"github.com/phoqer/api-gateway/config"
	"google.golang.org/api/option"
)

func NewGCStorageClient(config *config.Config) (*storage.Client, error) {
	ctx := context.Background()
	client, err := storage.NewClient(ctx, option.WithCredentialsJSON([]byte(config.GoogleServiceAccountJSON)))
	if err != nil {
		return nil, err
	}
	return client, nil
}
