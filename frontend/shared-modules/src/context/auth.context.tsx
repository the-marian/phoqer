import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';
import { User } from 'phoqer';

export enum AccountType {
    CLIENT = 'client',
    AUTHOR = 'author',
}

export interface UserType extends User {
    date: number;
    email: string;
    accountType: string;
}

export interface AuthData {
    loading: boolean;
    auth: boolean;
    user: UserType;
    logout: () => void;
}

export const AuthContext = createContext<AuthData>({} as AuthData);

interface Props {
    tokenKey: string;
    children: ReactNode;
    http: () => Promise<UserType>;
}

export const AuthContextProvider: FC<Props> = ({ tokenKey, http, children }) => {
    const [user, setUser] = useState<UserType>({} as UserType);
    const [auth, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = (): void => {
        setUser({} as UserType);
        setAuth(false);
        localStorage.setItem(tokenKey, '');
    };

    useEffect(() => {
        const token = localStorage.getItem(tokenKey);

        if (token && isEmpty(user)) {
            setLoading(true);
            http()
                .then(data => {
                    setUser(data);
                    setAuth(true);
                })
                .catch(error => {
                    console.log(error);
                    setAuth(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [http, tokenKey, user]);

    return <AuthContext.Provider value={{ auth, user, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthData => {
    return useContext(AuthContext);
};
