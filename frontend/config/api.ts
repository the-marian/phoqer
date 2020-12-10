import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers, Login } from '../interfaces';

const PROD = process.env.PROD_URL || process.env.NEXT_PUBLIC_PROD_URL;
const DEV = process.env.DEV_URL || process.env.NEXT_PUBLIC_DEV_URL;

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
