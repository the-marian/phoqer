import { CreateAxiosDefaults } from 'axios';
import qs from 'qs';

export const axiosApiConfig: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_BACK_URL || 'https://api.phoqer.com',
    timeout: 50_000,
    paramsSerializer: {
        serialize: params => qs.stringify(params, { skipNulls: true }),
    },
    headers: {
        'Content-Type': 'application/json',
    },
};
