package categories

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/phoqer/api-gateway/config"
	"github.com/phoqer/api-gateway/repository/category"
	categorySvc "github.com/phoqer/api-gateway/services/category"
)

var categoriesHandlers *CategoryHandlers

func TestMain(m *testing.M) {
	config := config.InitTestConfig()
	categoryRepository := category.NewCategoryRepository(config)
	categoryService := categorySvc.NewCategoryService(config, categoryRepository)

	categoriesHandlers = NewCategoryHandlers(config, categoryService)
}

func TestCategoriesHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/categories", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(categoriesHandlers.GetCategories)
	handler.ServeHTTP(rr, req)

	status := rr.Code
	if status != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, status)
	}

	expected_body := `[{"title":"Apple","slug":"apple","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/green-apple_1f34f.png","image":"https://Images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Phones","slug":"phones","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/mobile-phone_1f4f1.png","image":"https://Images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Laptops","slug":"laptops","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/laptop_1f4bb.png","image":"https://Images.unsplash.com/photo-1501163268664-3fdf329d019f?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Tablets","slug":"tablets","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1546868871-0f936769675e?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=1364\u0026q=80"},{"title":"VR","slug":"vr","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Transport","slug":"transport","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2371\u0026q=80"},{"title":"For children","slug":"for_children","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1542000551557-3fd0ad0eb15f?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2371\u0026q=80"},{"title":"For home and garden","slug":"for_home_and_garden","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Clothes and accessories","slug":"clothes_and_accessories","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1561052967-61fc91e48d79?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"},{"title":"Tools and special machinery","slug":"tools_and_special_machinery","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1580901368919-7738efb0f87e?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2372\u0026q=80"},{"title":"Sports and outdoors","slug":"sports_and_outdoors","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1541744573515-478c959628a0?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=1335\u0026q=80"},{"title":"Hobby","slug":"hobby","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1505850557988-b858c0aec076?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2531\u0026q=80"},{"title":"Other","slug":"other","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/upside-down-face_1f643.png","image":"https://Images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2274\u0026q=80"}]`
	if rr.Body.String() != expected_body {
		t.Errorf("Expected categories list, got %s", string(expected_body))
	}
}

func TestCategoryBySlugHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/categories", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(categoriesHandlers.GetCategoryBySlug)
	handler.ServeHTTP(rr, req)
	status := rr.Code
	if status != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, status)
	}

	expected_body := `{"title":"Apple","slug":"apple","description":"When an unknown printer took a galley of type and scrambled.","emoji":"https://Emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/green-apple_1f34f.png","image":"https://Images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=2370\u0026q=80"}`
	if rr.Body.String() != expected_body {
		t.Errorf("Expected categories list, got %s", string(expected_body))
	}
}
