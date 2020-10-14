import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers } from '../interfaces';

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

export interface IApi {
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
  categories: {
    get: (): Promise<AxiosResponse<ICategories>> => axios.get('/categories'),
  },
  offers: {
    popular: {
      get: (): Promise<AxiosResponse<IOffers>> => axios.get('/offers/popular/'),
    },
  },
};

export default api;
