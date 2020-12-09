import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers, Login } from '../interfaces';

const PROD = process.env.PROD_URL || process.env.NEXT_PUBLIC_PROD_URL;
const DEV = process.env.DEV_URL || process.env.NEXT_PUBLIC_DEV_URL;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? PROD : DEV;

export interface IApi {
  auth: {
    user: () => Promise<AxiosResponse<unknown>>;
    login: (data: Login) => Promise<AxiosResponse<{ auth_token: string }>>;
    logout: () => Promise<AxiosResponse<unknown>>;
  };
  categories: {
    get: () => Promise<AxiosResponse<ICategories>>;
  };
  offers: {
    popular: {
      get: () => Promise<AxiosResponse<IOffers>>;
    };
  };
}

const api: IApi = {
  auth: {
    user: (): Promise<AxiosResponse<unknown>> => axios.get('/users/me/'),
    login: (body: Login): Promise<AxiosResponse<{ auth_token: string }>> =>
      axios.post('/auth/token/login/', body),
    logout: (): Promise<AxiosResponse<unknown>> =>
      axios.post('/auth/token/logout/'),
  },
  categories: {
    get: (): Promise<AxiosResponse<ICategories>> => axios.get('/categories/'),
  },
  offers: {
    popular: {
      get: (): Promise<AxiosResponse<IOffers>> => {
        return axios.get('/offers/popular/');
      },
    },
  },
};

export default api;
