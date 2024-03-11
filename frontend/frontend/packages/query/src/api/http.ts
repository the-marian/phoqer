import axios from 'axios';

import { refreshFetcher } from '../auth';

import { axiosApiConfig } from './config';
import { JWT } from './jwt';

export const publicApi = axios.create(axiosApiConfig);
export const privateApi = axios.create({ ...axiosApiConfig, withCredentials: true });

export const jwt = new JWT(privateApi);

export const logOut = () => {
    jwt.remove();
    window.location.href = '/';
};

privateApi.interceptors.response.use(
    response => response,
    async error => {
        const request = error.config;

        if (error?.response?.status === 401 || error?.response?.data?.error.includes('token is expired')) {
            if (request._isRetry) {
                logOut();
                throw error;
            }
            request._isRetry = true;

            const body = jwt.get();
            if (!body) {
                logOut();
                throw error;
            }

            try {
                jwt.set(await refreshFetcher());
                return privateApi(request);
            } catch {
                logOut();
            }
        }

        throw error;
    },
);

privateApi.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        const data = jwt.get();
        if (data?.token) {
            config.headers.Authorization = `Bearer ${data.token}`;
        }
    }
    return config;
});
