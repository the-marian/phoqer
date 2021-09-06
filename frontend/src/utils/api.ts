import axios, { AxiosResponse } from 'axios';

import {
    ChatType,
    IAuth,
    ICategories,
    IChats,
    IComment,
    IMessages,
    IOfferCard,
    IOfferDynamic,
    IOfferPagination,
    IPagination,
    IPublicProfile,
    ISignup,
} from '../interfaces';
import { INewChat } from '../redux/chat/chats/interfaces';
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
        myOffers: ({ tab, params }: { tab: string; params: { [key: string]: unknown } }): Promise<AxiosResponse<IOfferDynamic>> =>
            axios.get(`${url2}/offers/status/${tab}`, { params }),
        publicOffers: (id: string, params: { [key: string]: unknown }): Promise<AxiosResponse<IOfferPagination>> =>
            axios.get(`${url2}/offers/public/${id}`, { params }),
        popular: (): Promise<AxiosResponse<IOfferPagination>> => axios.get(`${url2}/offers/popular`),
        single: (id: string): Promise<AxiosResponse<IOfferCard>> => axios.get(`${url2}/offers/${id}`),
        new: (body: IBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/offers`, body),
        update: (id: string, body: IBody | Partial<Body>): Promise<AxiosResponse<void>> =>
            axios.patch(`${url2}/offers/${id}`, body),
        status: (id: string, body: { [key: string]: unknown }): Promise<AxiosResponse<void>> =>
            axios.patch(`${url2}/offers/status/${id}`, body),
        search: (params: { [key: string]: unknown }): Promise<AxiosResponse<IOfferPagination>> =>
            axios.get(`${url2}/offers/search`, { params }),
        deleteOffer: (id: string): Promise<AxiosResponse<void>> => axios.delete(`${url2}/offers/${id}`),
        favorite: {
            get: (): Promise<AxiosResponse<IOfferCard[]>> => axios.get(`${url2}/favorite`),
            patch: (id: string): Promise<AxiosResponse<IOfferCard[]>> => axios.patch(`${url2}/favorite/${id}`),
        },
    },
    profiles: {
        private: {
            user: (): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/me`),
            userUpdate: (body: Partial<IPublicProfile>): Promise<AxiosResponse<IPublicProfile>> =>
                axios.patch(`${url2}/users/me`, body),
        },
        public: {
            get: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/${id}`),
            userShort: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url2}/users/short/${id}`),
        },
    },
    chat: {
        chats: (page = 1, type: ChatType = 'i_am_client'): Promise<AxiosResponse<IPagination<IChats>>> =>
            axios.get(`${url2}/chats?${type}=true`, { params: { page } }),
        createChat: (body: INewChat): Promise<AxiosResponse<INewChat>> => axios.post(`${url2}/chats`, body),
        messages: (id: number, page = 1): Promise<AxiosResponse<IPagination<IMessages>>> =>
            axios.get(`${url2}/chats/${id}`, { params: { page } }),
        offerInfo: (id: number): Promise<AxiosResponse<IOfferCard>> => axios.get(`${url2}/offers/offers/${id}`),
    },
    locations: {
        countries: (): Promise<AxiosResponse<void>> => axios.get(`${url2}/locations/countries`),
        cities: (slug: string): Promise<AxiosResponse<void>> => axios.get(`${url2}/locations/cities/${slug}`),
    },
    uploads: (form: FormData): Promise<AxiosResponse<{ image_url: string }>> =>
        axios.post(`${url2}/upload`, form, { headers: { 'content-type': 'multipart/form-data' } }),
};

export default api;
