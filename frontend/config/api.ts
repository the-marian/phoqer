import axios, { AxiosResponse } from 'axios';

import { ICategories, IOffers } from '../interfaces';

const PROD = process.env.PROD_URL || process.env.NEXT_PUBLIC_PROD_URL;
const DEV = process.env.DEV_URL || process.env.NEXT_PUBLIC_DEV_URL;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? PROD : DEV;

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
      get: (): Promise<AxiosResponse<IOffers>> => {
        return axios.get('/offers/popular/');
      },
    },
  },
};

export default api;
