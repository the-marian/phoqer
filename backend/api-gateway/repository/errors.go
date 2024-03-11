package repository

import "errors"

var (
	ErrNotFound         = errors.New("No documents in result")
	ErrInvalidId        = errors.New("Sting is not valid id")
	ErrUserAlreadyExist = errors.New("user with this email already exist")
)
