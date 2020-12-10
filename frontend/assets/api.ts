import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers, Login } from '../interfaces';
import config from './config';

const PROD = config.baseUrl.prod;
const DEV = config.baseUrl.dev;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? PROD : DEV;

const api = {
    auth: {
        user: (): Promise<AxiosResponse> => axios.get('/users/me/'),
        login: (body: Login): Promise<AxiosResponse> => axios.post('/auth/token/login/', body),
        logout: (): Promise<AxiosResponse> => axios.post('/auth/token/logout/'),
    },
    categories: {
        get: (): Promise<AxiosResponse<ICategories>> => axios.get('/categories'),
    },
    offers: {
        popular: {
            get: (): Promise<AxiosResponse<IOffers>> => axios.get('/offers/popular'),
        },
    },
};

export default api;