import { AxiosInstance } from 'axios';

import { AuthResponse } from '../auth';

export class JWT {
    static ACCESS_TOKEN_KEY = 'jwt';

    constructor(private axiosInstance: AxiosInstance) {}

    set = (data: AuthResponse): void => {
        localStorage.setItem(JWT.ACCESS_TOKEN_KEY, JSON.stringify(data));
        this.axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
    };

    get = (): AuthResponse | null => {
        if (typeof window === 'undefined') return null;

        const data: AuthResponse | null = JSON.parse(localStorage.getItem(JWT.ACCESS_TOKEN_KEY) ?? 'null');
        return data ? data : null;
    };

    remove = (): void => {
        localStorage.removeItem(JWT.ACCESS_TOKEN_KEY);
        this.axiosInstance.defaults.headers.Authorization = null;
    };

    refresh = (): boolean => {
        const data = this.get();
        if (!data) return false;

        this.axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
        return true;
    };
}
