package categories

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/phoqer/api-gateway/api/handlers"
	"github.com/phoqer/api-gateway/config"
	categorySvc "github.com/phoqer/api-gateway/services/category"
	"github.com/phoqer/api-gateway/types"
)

type CategoryHandlers struct {
	config          *config.Config
	categoryService categorySvc.ICategoryService
}

func NewCategoryHandlers(
	config *config.Config,
	categoryService categorySvc.ICategoryService,
) *CategoryHandlers {
	return &CategoryHandlers{
		config:          config,
		categoryService: categoryService,
	}
}

func (h *CategoryHandlers) GetCategories(w http.ResponseWriter, r *http.Request) {
	categories, _ := h.categoryService.GetCategories()
	var response types.CategoriesResponse
	for _, category := range categories {
		response = append(response, types.CategoryResponse(category))
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}

func (h *CategoryHandlers) GetCategoryBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	category, _ := h.categoryService.GetCategoryBySlug(slug)
	response := types.CategoryResponse{
		Title:       category.Title,
		Slug:        category.Slug,
		Description: category.Description,
		Emoji:       category.Emoji,
		Image:       category.Image,
	}
	handlers.RespondWithJSON(w, http.StatusOK, response)
}
