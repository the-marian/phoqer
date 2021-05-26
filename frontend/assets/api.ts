import axios, { AxiosResponse } from 'axios';
import { Params } from 'next/dist/next-server/server/router';

import {
    IAuth,
    ICategories,
    IComment,
    IOfferCard,
    IOfferDynamic,
    IOfferPagination,
    IPublicProfile,
    ISignup,
} from '../interfaces';
import { IBody } from '../redux/offers/new_offer/interfaces';
import config from './config';

const url2 = config.baseUrl[process.env.NODE_ENV]('v2');

interface ICommentBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

const api = {
    // V2
    categories: {
        get: (): Promise<AxiosResponse<ICategories>> => axios.get(`${url2}/categories`),
    },
    auth: {
        user: (): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/me`),
        login: (form: FormData): Promise<AxiosResponse<IAuth>> => axios.post(`${url2}/auth/login`, form),
        signup: (body: ISignup): Promise<AxiosResponse<void>> => axios.post(`${url2}/users/signup`, body),
    },
    comments: {
        list: (id: string): Promise<AxiosResponse<IComment[]>> => axios.get(`${url2}/comments/${id}`),
        create: (body: ICommentBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/comments`, body),
        delete: (id: number): Promise<AxiosResponse<void>> => axios.delete(`${url2}/comments/${id}`),
        like: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/like`),
        dislike: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/dislike`),
    },
    offers: {
        myOffers: ({ tab, params }: { tab: string; params: Params }): Promise<AxiosResponse<IOfferDynamic>> =>
            axios.get(`${url2}/offers/status/${tab}`, { params }),
        popular: (): Promise<AxiosResponse<IOfferPagination>> => axios.get(`${url2}/offers/popular`),
        single: (id: string): Promise<AxiosResponse<IOfferCard>> => axios.get(`${url2}/offers/${id}`),
        new: (body: IBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/offers`, body),
        update: (id: string, body: IBody | Partial<Body>): Promise<AxiosResponse<void>> =>
            axios.patch(`${url2}/offers/${id}`, body),
        status: (id: string, body: Params): Promise<AxiosResponse<void>> => axios.patch(`${url2}/offers/status/${id}`, body),
        search: (params: Params): Promise<AxiosResponse<IOfferPagination>> => axios.get(`${url2}/offers/search`, { params }),
        favorite: {
            get: (): Promise<AxiosResponse<IOfferCard[]>> => axios.get(`${url2}/favorite`),
            patch: (id: string): Promise<AxiosResponse<IOfferCard[]>> => axios.patch(`${url2}/favorite/${id}`),
        },
    },
    profiles: {
        public: {
            get: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/${id}`),
            userShort: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/short/${id}`),
        },
    },
    locations: {
        countries: (): Promise<AxiosResponse<void>> => axios.get(`${url2}/locations/countries`),
        cities: (slug: string): Promise<AxiosResponse<void>> => axios.get(`${url2}/locations/cities/${slug}`),
    },
};

export default api;
