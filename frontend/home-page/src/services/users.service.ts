import { ID, Pagination } from 'phoqer';
import { asyncCache, UserType } from 'phoqer-shared';

import { privateApiClient, publicApiClient } from '@app/http/http';

class UsersService {
    async getUser(): Promise<UserType> {
        const { data } = await privateApiClient.get<UserType>('/users');

        return data;
    }

    @asyncCache
    async getUsers(params: Record<string, string | number>): Promise<Pagination<UserType[]>> {
        const { data } = await publicApiClient.get<Pagination<UserType[]>>('/users/search', { params });

        return data;
    }

    @asyncCache
    async findUserById(id: ID): Promise<UserType> {
        const { data } = await publicApiClient.get<UserType>(`/users/${id}`);

        return data;
    }
}

export const usersService = new UsersService();
