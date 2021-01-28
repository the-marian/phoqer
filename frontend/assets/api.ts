import axios, { AxiosResponse } from 'axios';

import { ICategories, IComment, IOffers, Login } from '../interfaces';
import { IBody } from '../redux/offers/new_offer/saga';
import config from './config';

const url1 = config.baseUrl[process.env.NODE_ENV]('v1');

const v1 = {
    auth: {
        user: (): Promise<AxiosResponse> => axios.get(`${url1}/users/me/`),
        login: (body: Login): Promise<AxiosResponse> => axios.post(`${url1}/auth/token/login/`, body),
        logout: (): Promise<AxiosResponse> => axios.post(`${url1}/auth/token/logout/`),
    },
    categories: {
        get: (): Promise<AxiosResponse<ICategories>> => axios.get(`${url1}/categories/`),
    },
    offers: {
        popular: {
            get: (): Promise<AxiosResponse<IOffers>> => axios.get(`${url1}/offers/popular/`),
        },
        single: {
            get: (id: string): Promise<AxiosResponse<IOffers>> => axios.get(`${url1}/offers/${id}/`),
        },
        new: {
            post: (body: IBody): Promise<AxiosResponse<void>> => axios.post(`${url1}/offers/`, body),
        },
    },
};

const url2 = config.baseUrl[process.env.NODE_ENV]('v2');

interface ICommentBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: { url: string }[];
}

const v2 = {
    comments: {
        list: (id: string): Promise<AxiosResponse<IComment[]>> => axios.get(`${url2}/comments/${id}`),
        create: (body: ICommentBody): Promise<AxiosResponse<void>> => axios.post(`${url2}/comments/`, body),
        delete: (id: number): Promise<AxiosResponse<void>> => axios.delete(`${url2}/comments/${id}`),
        like: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/like/`),
        dislike: (id: number): Promise<AxiosResponse<void>> => axios.patch(`${url2}/comments/${id}/dislike/`),
    },
};

export default { v1, v2 };
