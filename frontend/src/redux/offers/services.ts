import { AxiosResponse } from 'axios';

import { IOfferCard, IOfferDynamic, IOfferPagination, Params } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

import { IBody } from './new_offer/interfaces';

const services = {
    myOffers: ({ tab, params }: { tab: string; params: Params }): Promise<AxiosResponse<IOfferDynamic>> =>
        api.get(endpoint(`/offers/status/${tab}`), { params }),
    publicOffers: (id: string, params: Params): Promise<AxiosResponse<IOfferPagination>> =>
        api.get(endpoint(`/offers/public/${id}`), { params }),
    popular: (): Promise<AxiosResponse<IOfferPagination>> => api.get(endpoint('/offers/popular')),
    single: (id: string): Promise<AxiosResponse<IOfferCard>> => api.get(endpoint(`/offers/${id}`)),
    new: (body: IBody): Promise<AxiosResponse<void>> => api.post(endpoint('/offers'), body),
    update: (id: string, body: IBody | Partial<Body>): Promise<AxiosResponse<void>> => api.patch(endpoint(`/offers/${id}`), body),
    status: (id: string, body: Params): Promise<AxiosResponse<void>> => api.patch(endpoint(`/offers/status/${id}`), body),
    search: (params: Params): Promise<AxiosResponse<IOfferPagination>> => api.get(endpoint('/offers/search'), { params }),
    deleteOffer: (id: string): Promise<AxiosResponse<void>> => api.delete(endpoint(`/offers/${id}`)),
    favorite: {
        get: (): Promise<AxiosResponse<IOfferCard[]>> => api.get(endpoint('/favorite')),
        patch: (id: string): Promise<AxiosResponse<IOfferCard[]>> => api.patch(endpoint(`/favorite/${id}`)),
    },
};

export default services;
