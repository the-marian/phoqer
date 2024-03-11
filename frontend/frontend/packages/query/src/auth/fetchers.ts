import { publicApi } from '../api';

import { AuthResponse, LoginBody, SignupBody } from './types';

export const logInFetcher = (body: LoginBody): Promise<AuthResponse> => {
    return publicApi.post<AuthResponse>('/auth/login', body).then(res => {
        return res.data;
    });
};

export const signUpFetcher = (body: SignupBody): Promise<AuthResponse> => {
    return publicApi.post<AuthResponse>('/auth/join', body).then(res => res.data);
};

export const refreshFetcher = (): Promise<AuthResponse> => {
    return publicApi.get('/auth/refresh').then(res => res.data);
};
