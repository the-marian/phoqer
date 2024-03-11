package category

import (
	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/repository/category"
	"github.com/phoqer/api-gateway/types"
)

type ICategoryService interface {
	GetCategories() ([]types.CategoryModel, error)
	GetCategoryBySlug(slug string) (*types.CategoryModel, error)
}

func NewCategoryService(
	config *config.Config,
	categoryRepository *category.CategoryRepository,
) *CategoryService {
	return &CategoryService{
		Config:             config,
		CategoryRepository: categoryRepository,
	}
}

type CategoryService struct {
	CategoryRepository category.CategoryRepositoryInterface
	Config             *config.Config
}

func (c CategoryService) GetCategoryBySlug(slug string) (*types.CategoryModel, error) {
	category, err := c.CategoryRepository.GetCategoryBySlug(slug)
	return category, err
}

func (c CategoryService) GetCategories() ([]types.CategoryModel, error) {
	categories, err := c.CategoryRepository.GetCategories()
	return categories, err
}
