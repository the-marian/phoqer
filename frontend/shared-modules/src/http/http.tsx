import { AxiosInstance, AxiosRequestConfig, AxiosStatic, AxiosResponse } from 'axios';

import { logger } from 'src/utils/logger';

export interface AuthResponse {
    token: string;
    expired: string;
}

export interface HttpClientParams {
    axios: AxiosStatic;
    key: string;
    refreshEndpoint: string;
    config?: AxiosRequestConfig;
}

interface CacheData {
    expired: number;
    data: unknown;
}

const TEN_MINUTES = 600_000;

export class Cache {
    private _data: Record<string, CacheData> = {} as Record<string, CacheData>;

    reset(): void {
        this._data = {} as Record<string, CacheData>;
    }

    get<T>(key: string): T | null {
        const data = this._data[key];

        if (!data) return null;
        if (data.expired < Date.now()) {
            delete this._data[key];
            return null;
        }

        return data.data as T;
    }

    set(key: string, data: unknown): void {
        this._data[key] = {
            data,
            expired: Date.now() + TEN_MINUTES,
        };
    }
}

export const cacheMap = new Cache();

export const asyncCache = (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    descriptor.value = async (...args: unknown[]): Promise<unknown> => {
        const key = JSON.stringify(args) + propertyKey;

        const cachedData = cacheMap.get(key);
        if (cachedData) return Promise.resolve(cachedData);

        const result = await originalMethod(...args);
        cacheMap.set(key, result);

        return Promise.resolve(result);
    };

    return descriptor;
};

export const createPrivateApiClient = ({ axios, refreshEndpoint, key, config = {} }: HttpClientParams): AxiosInstance => {
    const http = axios.create({
        withCredentials: true,
        ...config,
    });

    http.interceptors.request.use(config => {
        if (config.method !== 'get' && config.method !== 'GET') {
            cacheMap.reset();
        }

        try {
            const token = localStorage.getItem(key);
            if (config.headers && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            console.log('Access token expired');
        }

        return config;
    }, logger.errorPromiseLogger);

    http.interceptors.response.use(logger.responseLogger, async error => {
        const request = error.config;

        if (error?.response?.status === 401) {
            if (request._isRetry) {
                localStorage.setItem(key, '');
                typeof window !== 'undefined' && window.open('/', '_self');
                return;
            }

            request._isRetry = true;
            try {
                const { data } = await axios.get<AuthResponse>(refreshEndpoint, { withCredentials: true });
                localStorage.setItem(key, data.token);

                return http.request(request);
            } catch {
                console.log('Refresh token expired. 401 - Not authorized');
            }
        }

        return logger.errorPromiseLogger(error);
    });

    return http;
};

export const createPublicApiClient = (axios: AxiosStatic, config?: AxiosRequestConfig): AxiosInstance => {
    const http = axios.create(config);

    http.interceptors.request.use(async config => {
        if (config.method !== 'get' && config.method !== 'GET') {
            cacheMap.reset();
        }

        return config;
    }, logger.errorPromiseLogger);

    http.interceptors.response.use(logger.responseLogger, logger.errorPromiseLogger);

    return http;
};

export type { AxiosInstance, AxiosRequestConfig, AxiosStatic, AxiosResponse };
