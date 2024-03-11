package types

type CategoryModel struct {
	Title       string
	Slug        string
	Description string
	Emoji       string
	Image       string
}

type CategoriesModel []CategoryModel
