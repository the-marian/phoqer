import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers, Login } from '../interfaces';
import config from './config';
import { IBody } from '../redux/new_offer/saga';

axios.defaults.baseURL = config.baseUrl;

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
        new: {
            post: (body: IBody): Promise<AxiosResponse<void>> => axios.post('/offers/', body),
        },
    },
};

export default api;
