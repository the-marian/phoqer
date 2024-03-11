package media

import (
	"net/http"

	"github.com/google/uuid"

	"github.com/phoqer/api-gateway/api/handlers"
	mediaSvc "github.com/phoqer/api-gateway/services/media"
)

type MediaUploadHandlers struct {
	mediaService mediaSvc.MediaServiceInterface
}

func NewMediaHandlers(
	mediaService mediaSvc.MediaServiceInterface,
) *MediaUploadHandlers {
	return &MediaUploadHandlers{
		mediaService: mediaService,
	}
}

func (h *MediaUploadHandlers) Uploads(w http.ResponseWriter, r *http.Request) {
	image, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error retrieving file from form", http.StatusBadRequest)
		return
	}
	defer image.Close()
	uuid := uuid.NewString()
	url, err := h.mediaService.CompressImageAndSave(uuid, image)
	if err != nil {
		http.Error(w, "Error compressing image", http.StatusInternalServerError)
		return
	}
	handlers.RespondWithJSON(w, http.StatusOK, struct {
		Url string `json:"url"`
	}{
		Url: url,
	})
}
