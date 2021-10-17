import axios, { AxiosResponse } from 'axios';

import { IOfferCard, IOfferDynamic, IOfferPagination, Params } from '../../interfaces';
import endpoint from '../../utils/endpoint';

import { IBody } from './new_offer/interfaces';

const services = {
    myOffers: ({ tab, params }: { tab: string; params: Params }): Promise<AxiosResponse<IOfferDynamic>> =>
        axios.get(endpoint(`/offers/status/${tab}`), { params }),
    publicOffers: (id: string, params: Params): Promise<AxiosResponse<IOfferPagination>> =>
        axios.get(endpoint(`/offers/public/${id}`), { params }),
    popular: (): Promise<AxiosResponse<IOfferPagination>> => axios.get(endpoint('/offers/popular')),
    single: (id: string): Promise<AxiosResponse<IOfferCard>> => axios.get(endpoint(`/offers/${id}`)),
    new: (body: IBody): Promise<AxiosResponse<void>> => axios.post(endpoint('/offers'), body),
    update: (id: string, body: IBody | Partial<Body>): Promise<AxiosResponse<void>> =>
        axios.patch(endpoint(`/offers/${id}`), body),
    status: (id: string, body: Params): Promise<AxiosResponse<void>> => axios.patch(endpoint(`/offers/status/${id}`), body),
    search: (params: Params): Promise<AxiosResponse<IOfferPagination>> => axios.get(endpoint('/offers/search'), { params }),
    deleteOffer: (id: string): Promise<AxiosResponse<void>> => axios.delete(endpoint(`/offers/${id}`)),
    favorite: {
        get: (): Promise<AxiosResponse<IOfferCard[]>> => axios.get(endpoint('/favorite')),
        patch: (id: string): Promise<AxiosResponse<IOfferCard[]>> => axios.patch(endpoint(`/favorite/${id}`)),
    },
};

export default services;
