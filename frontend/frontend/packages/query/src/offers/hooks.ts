import { useMutation, useQuery } from '@tanstack/react-query';

import { ID } from '../types';

import {
    createOfferFetcher,
    geOfferByCategoryFetcher,
    getAuthorOffersFetcher,
    getOfferByIdFetcher,
    getTopOffersFetcher,
    getUserOfferFetcher,
    searchOfferFetcher,
    updateOfferFetcher,
} from './fetchers';
import { CreateOfferBody, OfferCard, OfferItem, OfferList, UpdateOfferBody } from './types';

export const useTopOffers = () => {
    return useQuery<OfferCard[]>({
        queryKey: ['offers', 'top'],
        queryFn: getTopOffersFetcher,
    });
};

export const useGetOfferByCategory = (slug?: string | null) => {
    return useQuery<OfferList>({
        queryKey: ['offers', slug],
        queryFn: () => geOfferByCategoryFetcher(slug!),
        enabled: Boolean(slug),
    });
};

export const useGetOfferById = (id?: ID) => {
    return useQuery<OfferItem>({
        queryKey: ['offers', id],
        queryFn: () => getOfferByIdFetcher(id!),
        enabled: Boolean(id),
    });
};

export const useAuthorOffers = (params: Record<string, string | number> = {}) => {
    return useQuery<OfferList>({
        queryKey: ['offers', 'author'],
        queryFn: () => getAuthorOffersFetcher(params),
    });
};

export const useGetUserOffers = (id: ID) => {
    return useQuery<OfferList>({
        queryKey: ['offers', 'users', id],
        queryFn: () => getUserOfferFetcher(id),
    });
};

export const useSearchOffers = (params: Record<string, string | number> = {}) => {
    return useQuery<OfferList>({
        queryKey: ['offers', 'users', ...Object.values(params)],
        queryFn: () => searchOfferFetcher(params),
        keepPreviousData: true,
    });
};

export const useCreateOffer = () => {
    return useMutation<OfferItem, unknown, CreateOfferBody>({
        mutationKey: ['offers', 'create'],
        mutationFn: createOfferFetcher,
    });
};

export const useUpdateOffer = () => {
    return useMutation<OfferItem, unknown, UpdateOfferBody>({
        mutationKey: ['offers', 'update'],
        mutationFn: updateOfferFetcher,
    });
};
