import { UserType } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';

class UsersService {
    async getUser(): Promise<UserType> {
        const { data } = await privateApiClient.get<UserType>('/users');

        return data;
    }
}

export const usersService = new UsersService();
