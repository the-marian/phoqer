package category

import (
	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/types"
)

type CategoryRepositoryInterface interface {
	GetCategories() ([]types.CategoryModel, error)
	GetCategoryBySlug(slug string) (*types.CategoryModel, error)
}

type CategoryRepository struct {
	config *config.Config
}

func NewCategoryRepository(config *config.Config) *CategoryRepository {
	return &CategoryRepository{
		config: config,
	}
}

func (c *CategoryRepository) GetCategories() ([]types.CategoryModel, error) {
	return []types.CategoryModel{
		{
			Title:       "Apple",
			Slug:        "apple",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/green-apple_1f34f.png",
			Image:       "https://Images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Phones",
			Slug:        "phones",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/mobile-phone_1f4f1.png",
			Image:       "https://Images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Laptops",
			Slug:        "laptops",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/laptop_1f4bb.png",
			Image:       "https://Images.unsplash.com/photo-1501163268664-3fdf329d019f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Tablets",
			Slug:        "tablets",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1546868871-0f936769675e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
		},
		{
			Title:       "VR",
			Slug:        "vr",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Transport",
			Slug:        "transport",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
		},
		{
			Title:       "For children",
			Slug:        "for_children",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1542000551557-3fd0ad0eb15f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
		},
		{
			Title:       "For home and garden",
			Slug:        "for_home_and_garden",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Clothes and accessories",
			Slug:        "clothes_and_accessories",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1561052967-61fc91e48d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		},
		{
			Title:       "Tools and special machinery",
			Slug:        "tools_and_special_machinery",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1580901368919-7738efb0f87e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80",
		},
		{
			Title:       "Sports and outdoors",
			Slug:        "sports_and_outdoors",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1541744573515-478c959628a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
		},
		{
			Title:       "Hobby",
			Slug:        "hobby",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1505850557988-b858c0aec076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80",
		},
		{
			Title:       "Other",
			Slug:        "other",
			Description: "When an unknown printer took a galley of type and scrambled.",
			Emoji:       "https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png",
			Image:       "https://Images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
		},
	}, nil
}

func (c *CategoryRepository) GetCategoryBySlug(slug string) (*types.CategoryModel, error) {
	categories, _ := c.GetCategories()
	for _, category := range categories {
		if category.Slug == slug {
			return &category, nil
		}
	}
	return nil, nil
}
