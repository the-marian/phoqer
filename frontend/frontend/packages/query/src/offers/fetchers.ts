import { privateApi, publicApi } from '../api';
import { UiPagination } from '../constants';
import { ID } from '../types';

import { CreateOfferBody, OfferCard, OfferItem, OfferList, UpdateOfferBody } from './types';

export const getTopOffersFetcher = () => {
    return publicApi
        .get<OfferCard[]>('/offers/top', {
            params: { limit: UiPagination.LG, isTop: true },
        })
        .then(res => res.data);
};

export const geOfferByCategoryFetcher = (slug: string) => {
    return publicApi
        .get<OfferList>('/offers', {
            params: { limit: UiPagination.SM, categories: slug, isTop: true },
        })
        .then(res => res.data);
};

export const getOfferByIdFetcher = (id: ID) => {
    return publicApi.get<OfferItem>(`/offers/${id}`).then(res => res.data);
};

export const getUserOfferFetcher = (id: ID) => {
    return publicApi
        .get<OfferList>(`/offers/users/${id}`, {
            params: { limit: UiPagination.XL },
        })
        .then(res => res.data);
};

export const searchOfferFetcher = (params: Record<string, string | number>) => {
    return publicApi
        .get<OfferList>('/offers', {
            params: { limit: UiPagination.XL, ...params },
        })
        .then(res => res.data);
};

export const createOfferFetcher = (body: CreateOfferBody) => {
    return privateApi.post<OfferItem>('/offers', body).then(res => res.data);
};

export const updateOfferFetcher = (body: UpdateOfferBody) => {
    return privateApi.put<OfferItem>(`/offers/${body.id}`, body).then(res => res.data);
};

export const getAuthorOffersFetcher = (params: Record<string, string | number>) => {
    return privateApi.get<OfferList>('/offers/author', { params: { limit: UiPagination.XL, ...params } }).then(res => res.data);
};
