import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers, Login } from '../interfaces';
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
};

export default api;
