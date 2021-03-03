import axios, { AxiosResponse } from 'axios';
import { Params } from 'next/dist/next-server/server/router';

import { ICategories, IComment, IOfferCard, IOfferPagination, IPublicProfile, Login } from '../interfaces';
import { IBody } from '../redux/offers/new_offer/saga';
import config from './config';

const url1 = config.baseUrl[process.env.NODE_ENV]('v1');
const url2 = config.baseUrl[process.env.NODE_ENV]('v2');

interface ICommentBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

const api = {
    // V1
    auth: {
        user: (): Promise<AxiosResponse> => axios.get(`${url1}/users/me/`),
        login: (body: Login): Promise<AxiosResponse> => axios.post(`${url1}/auth/token/login/`, body),
        logout: (): Promise<AxiosResponse> => axios.post(`${url1}/auth/token/logout/`),
    },
    profiles: {
        public: {
            get: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(`${url1}/profiles/${id}/`),
        },
    },
    categories: {
        get: (): Promise<AxiosResponse<ICategories>> => axios.get(`${url1}/categories/`),
    },

    // V2
    comments: {
        list: (id: string): Promise<AxiosResponse<IComment[]>> => axios.get(`${url2}/comments/${id}`),
        create: (body: ICommentBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/comments`, body),
        delete: (id: number): Promise<AxiosResponse<void>> => axios.delete(`${url2}/comments/${id}`),
        like: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/like`),
        dislike: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/dislike`),
    },
    offers: {
        popular: (): Promise<AxiosResponse<IOfferPagination>> => axios.get(`${url2}/offers/popular`),
        single: (id: string): Promise<AxiosResponse<IOfferCard>> => axios.get(`${url2}/offers/${id}`),
        new: (body: IBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/offers`, body),
        search: (params: Params): Promise<AxiosResponse<IOfferCard[]>> => axios.get(`${url2}/offers/search`, { params }),
    },
};

export default api;
