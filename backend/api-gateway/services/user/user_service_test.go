package user

import (
	"os"
	"testing"

	"github.com/phoqer/api-gateway/repository/user"
	"github.com/phoqer/api-gateway/types"
)

var user_service *UserService

func TestMain(m *testing.M) {
	fake_user_repo := user.NewFakeUserRepository()
	user_service = NewUserService(fake_user_repo)
	code := m.Run()
	os.Exit(code)
}

func TestUserServiceCreate(t *testing.T) {
	testCases := []struct {
		name           string
		userParam      types.UserRequest
		expectedReturn error
	}{
		{
			name: "happy path",
			userParam: types.UserRequest{
				Email:     "user_does_not_exist@gmail.com",
				FirstName: "Marian",
				LastName:  "Zozulia",
				Password:  "dupa123",
			},
			expectedReturn: nil,
		},
		{
			name: "user already exist",
			userParam: types.UserRequest{
				Email:     "user_exist@gmail.com",
				FirstName: "Marian",
				LastName:  "Zozulia",
				Password:  "dupa123",
			},
			expectedReturn: ErrUserAlreadyExist,
		},
		{
			name: "empty user email",
			userParam: types.UserRequest{
				Email:     "",
				FirstName: "Marian",
				LastName:  "Zozulia",
				Password:  "dupa123",
			},
			expectedReturn: ErrUserEmailIsEmptyField,
		},
	}
	for _, test := range testCases {
		_, real_return := user_service.CreateUser(test.userParam)
		if real_return != test.expectedReturn {
			t.Errorf(
				"Test case: %s. Got %v, wanted %v",
				test.name,
				real_return,
				test.expectedReturn,
			)
		}
	}
}
