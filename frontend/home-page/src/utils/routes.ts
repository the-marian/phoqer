import { isEmpty, omitBy } from 'lodash-es';
import { ID } from 'phoqer';

import { LANGUAGE_ENUM } from '@app/types/language.type';
import { queryParams } from '@app/utils/query-params';

export const routes = {
    home: '/',
    favorite: '/favorite',
    search: (query?: Record<string, unknown>): string => {
        const newQuery = omitBy(query, value => !value);
        if (!isEmpty(newQuery)) {
            return `/search/?${queryParams(newQuery)}`;
        }

        return '/search';
    },
    categories: {
        list: '/categories',
    },
    offers: {
        new: '/author/new-offer',
        edit: (id: ID): string => `/author/offers/${id}`,
        single: (id: ID, tab?: string): string => (tab ? `/offers/${id}/${tab}` : `/offers/${id}`),
    },
    users: {
        single: (id: ID): string => `/users/${id}`,
    },
    auth: {
        login: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/auth/login`,
        join: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/auth/join`,
        reset: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/auth/reset`,
    },
    author: {
        home: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/author`,
        app: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/author/app`,
        newOffer: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/author/new-offer`,
        orders: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/author/orders`,
    },
    client: {
        home: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/client`,
        orders: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/client/orders`,
        settings: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/client/settings`,
    },
    chats: {
        list: (locale: string = LANGUAGE_ENUM.EN) => `/${locale}/chats`,
        single: (locale: string = LANGUAGE_ENUM.EN, chatId: ID) => `/${locale}/chats/${chatId}`,
    },
};
