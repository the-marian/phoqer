package media

import (
	"bytes"
	"image"
	_ "image/gif"
	"image/jpeg"
	_ "image/png"
	"io"

	"github.com/phoqer/api-gateway/repository/media"
)

const jpegQuality = 35

type MediaServiceInterface interface {
	CompressImageAndSave(fileName string, r io.Reader) (string, error)
}

func NewMediaService(mediaRepository media.MediaRepositoryInterface) *MediaService {
	return &MediaService{
		mediaRepository: mediaRepository,
	}
}

type MediaService struct {
	mediaRepository media.MediaRepositoryInterface
}

func (s *MediaService) CompressImage(r io.Reader, w io.Writer) error {
	img, _, err := image.Decode(r)
	if err != nil {
		return err
	}
	options := jpeg.Options{Quality: jpegQuality}
	if err := jpeg.Encode(w, img, &options); err != nil {
		return err
	}
	return nil
}

func (s *MediaService) Upload(fileName string, r io.Reader) (string, error) {
	mediaUrl, err := s.mediaRepository.Upload(fileName, r)
	if err != nil {
		return "", err
	}
	return mediaUrl, nil
}

func (s *MediaService) CompressImageAndSave(fileName string, r io.Reader) (string, error) {
	var compressedImage bytes.Buffer
	err := s.CompressImage(r, &compressedImage)
	if err != nil {
		return "", err
	}
	url, err := s.Upload(fileName, &compressedImage)
	if err != nil {
		return "", err
	}
	return url, nil
}
