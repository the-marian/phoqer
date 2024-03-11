package media

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// this test can be used for local development
// make sure GOOGLE_SERVICE_ACCOUNT_JSON env variable is exported
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import (
// 	"os"
// 	"testing"
//
// 	"github.com/phoqer/api-gateway/config"
// )

// func TestMediaStorage(t *testing.T) {
// 	config.LoadEnvVariables()
// 	config := config.InitTestConfig()
// 	config.MediaBucketName = "media.phoqer.com"
// 	config.GoogleServiceAccountJSON = os.Getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
// 	fileName := "file_for_test.jpeg"
// 	storageClient, err := NewGCStorageClient(config)
// 	if err != nil {
// 		t.Error(err)
// 	}
// 	mediaRepository := NewMediaRepository(config, storageClient)
// 	f, err := os.Open(fileName)
// 	if err != nil {
// 		t.Error(err)
// 	}
//
// 	_, err = mediaRepository.Upload(fileName, f)
// 	if err != nil {
// 		t.Error(err)
// 	}
// }
