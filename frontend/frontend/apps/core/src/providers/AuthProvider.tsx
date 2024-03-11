import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { logOut, jwt } from 'query';

export interface AuthData {
    isReady: boolean;
    isAuth: boolean;
    onLogout: () => void;
}

export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, auth] = useBoolean();
    const [isReady, ready] = useBoolean();

    const onLogout = useCallback((): void => {
        auth.off();
        logOut();
    }, [auth.off]);

    useEffect(() => {
        if (jwt.refresh()) {
            auth.on();
        }
        ready.on();
    }, [auth.on, ready.on]);

    return <AuthContext.Provider value={{ isReady, isAuth, onLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthData => {
    return useContext(AuthContext);
};
