import axios, { AxiosResponse } from 'axios';

import { ICategories } from '../interfaces';

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEV_URL
    : process.env.PROD_URL;

export interface IApi {
  categories: {
    get: () => Promise<AxiosResponse<ICategories>>;
  };
}

const api: IApi = {
  categories: {
    get: (): Promise<AxiosResponse<ICategories>> => axios.get('/api/v1/categories'),
  },
};

export default api;
