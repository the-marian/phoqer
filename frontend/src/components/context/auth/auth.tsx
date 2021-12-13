import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import { PHOQER_AUTH } from '../../../constant/cookie.constant';
import { IAuthResponse } from '../../../interfaces';
import api from '../../../utils/interceptors';

const authInitialValue: IAuthResponse = { access_token: null };
export type AuthHook = { token: IAuthResponse; setToken: (value: IAuthResponse) => void; logout: () => void };
export const Auth = createContext<AuthHook>({ token: authInitialValue, setToken: () => undefined, logout: () => undefined });

interface IProps {
    initValue: IAuthResponse;
    children: ReactNode;
}

const AuthProvider = ({ initValue = authInitialValue, children }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const [token, setToken] = useState<IAuthResponse>(initValue);
    api.defaults.headers.common.Authorization = token.access_token;

    const logout = (): void => {
        setToken(authInitialValue);
        delete api.defaults.headers.common.Authorization;
        Cookies.remove(PHOQER_AUTH);
    };

    const logoutWithReload = (): void => {
        logout();
        window.location.reload();
    };

    const handleSetValue = useCallback((value: IAuthResponse) => {
        if (value.access_token) {
            setToken(value);
            api.defaults.headers.common.Authorization = value.access_token;
        } else {
            setToken(authInitialValue);
            delete api.defaults.headers.common.Authorization;
            Cookies.remove(PHOQER_AUTH);
        }
    }, []);

    useEffect(() => {
        try {
            handleSetValue(JSON.parse(Cookies.get(PHOQER_AUTH) || '') || null);
        } catch (error) {
            handleSetValue(authInitialValue);
        }
    }, [initValue, dispatch, handleSetValue]);

    return <Auth.Provider value={{ token, setToken, logout: logoutWithReload }}>{children}</Auth.Provider>;
};

export default AuthProvider;
