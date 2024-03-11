package media

import (
	"context"
	"io"

	"cloud.google.com/go/storage"

	"github.com/phoqer/api-gateway/config"
)

type MediaRepositoryInterface interface {
	Upload(fileName string, r io.Reader) (string, error)
}

func NewMediaRepository(config *config.Config, storageClient *storage.Client) *MediaRepository {
	return &MediaRepository{
		config: config,
		client: storageClient,
	}
}

type MediaRepository struct {
	config *config.Config
	client *storage.Client
}

func (m *MediaRepository) Upload(fileName string, r io.Reader) (string, error) {
	bkt := m.client.Bucket(m.config.MediaBucketName)
	ctx := context.Background()
	obj := bkt.Object(fileName)
	w := obj.NewWriter(ctx)
	_, err := io.Copy(w, r)
	if err != nil {
		return "", err
	}
	err = w.Close()
	if err != nil {
		return "", err
	}

	objAttrs, err := obj.Attrs(ctx)
	if err != nil {
		return "", err
	}

	return objAttrs.MediaLink, nil
}
