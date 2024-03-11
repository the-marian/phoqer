package pagination

import "github.com/phoqer/api-gateway/types"

func PaginatedResponse(items interface{}, itemsCount, pageSize, currentPage int) *types.PaginatedResponse {
	totalPages := itemsCount / pageSize

	if itemsCount%pageSize != 0 {
		totalPages++
	}

	paginatedResponse := &types.PaginatedResponse{
		Limit:       pageSize,
		CurrentPage: currentPage,
		TotalItems:  itemsCount,
		TotalPages:  totalPages,
		Data:        items,
	}
	return paginatedResponse
}
