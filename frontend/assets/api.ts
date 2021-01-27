import axios, { AxiosResponse } from 'axios';

import { ICategories, IComment, IOffers, Login } from '../interfaces';
import { IBody } from '../redux/offers/new_offer/saga';
import config from './config';

axios.defaults.baseURL = config.baseUrl[process.env.NODE_ENV];

const api = {
    auth: {
        user: (): Promise<AxiosResponse> => axios.get('/users/me/'),
        login: (body: Login): Promise<AxiosResponse> => axios.post('/auth/token/login/', body),
        logout: (): Promise<AxiosResponse> => axios.post('/auth/token/logout/'),
    },
    categories: {
        get: (): Promise<AxiosResponse<ICategories>> => axios.get('/categories/'),
    },
    offers: {
        popular: {
            get: (): Promise<AxiosResponse<IOffers>> => axios.get('/offers/popular/'),
        },
        single: {
            get: (id: string): Promise<AxiosResponse<IOffers>> => axios.get(`/offers/${id}/`),
        },
        new: {
            post: (body: IBody): Promise<AxiosResponse<void>> => axios.post('/offers/', body),
        },
    },
    comments: {
        list: (id: string): Promise<AxiosResponse<IComment[]>> => axios.get(`/comments/${id}`),
        create: (id: string, body: { body: string; offer_id: string; images: { url: string }[] }): Promise<AxiosResponse<void>> =>
            axios.post(`/comments/${id}/`, body),
        delete: (id: number): Promise<AxiosResponse<void>> => axios.delete(`/comments/${id}`, {}),
        reply: (id: number, body: { body: string; images: { url: string }[] }): Promise<AxiosResponse<void>> =>
            axios.post(`/comments/${id}/reply/`, body),
        like: (id: number): Promise<AxiosResponse<void>> => axios.patch(`/comments/${id}/like/`),
        dislike: (id: number): Promise<AxiosResponse<void>> => axios.patch(`/comments/${id}/dislike/`),
    },
};

export default api;
