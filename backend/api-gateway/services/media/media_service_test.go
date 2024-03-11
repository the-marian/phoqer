package media

import (
	"io"
	"os"
	"testing"
)

type fakeMediaRepository struct{}

var expectedUrl string = "compressed_image.jpeg"

func (mr *fakeMediaRepository) Upload(fileName string, r io.Reader) (string, error) {
	file, err := os.Create(fileName)
	if err != nil {
		return "", err
	}
	defer file.Close()
	_, err = io.Copy(file, r)
	if err != nil {
		return "", err
	}
	return expectedUrl, nil
}

func TestUpload(t *testing.T) {
	mediaRepository := fakeMediaRepository{}
	mediaService := NewMediaService(&mediaRepository)

	sourceFile, err := os.Open("file_for_test.jpeg")
	if err != nil {
		t.Error(err)
	}
	defer sourceFile.Close()

	url, err := mediaService.CompressImageAndSave(expectedUrl, sourceFile)
	if err != nil {
		t.Error(err)
	}
	if url != expectedUrl {
		t.Error()
	}
}
