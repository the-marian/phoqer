import { useMutation } from '@tanstack/react-query';

import { jwt } from '../api';

import { logInFetcher, signUpFetcher } from './fetchers';
import { AuthResponse, LoginBody } from './types';

export const useLogIn = () => {
    return useMutation<AuthResponse, unknown, LoginBody>({
        mutationKey: ['login'],
        mutationFn: logInFetcher,
        onError: jwt.remove,
        onSuccess: data => {
            jwt.set(data);
            window.location.href = '/';
        },
    });
};

export const useSignUp = () => {
    return useMutation({
        mutationKey: ['signup'],
        mutationFn: signUpFetcher,
    });
};
