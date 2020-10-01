import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEV_URL
    : process.env.PROD_URL;

export interface IApi {
  categories: {
    get: <T>() => Promise<AxiosResponse<T>>;
  };
}

const api: IApi = {
  categories: {
    get: () => axios.get('/api/categories'),
  },
};

export default api;
