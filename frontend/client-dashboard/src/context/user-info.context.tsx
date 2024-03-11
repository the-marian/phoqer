import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';
import { UserType } from 'phoqer-shared';

import { usersService } from 'src/services/users.service';

export interface UserInfoContextType {
    user: UserType;
    loading: boolean;
    fetchUser: () => void;
}

export const UserInfoContext = createContext<UserInfoContextType>({} as UserInfoContextType);

interface Props {
    children: ReactNode;
}
export const UserInfoContextProvider = ({ children }: Props): JSX.Element => {
    const [user, setUser] = useState<UserType>({} as UserType);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(() => {
        setLoading(true);
        usersService
            .getUser()
            .then(setUser)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (isEmpty(user)) {
            fetchUser();
        }
    }, [fetchUser, user]);

    return <UserInfoContext.Provider value={{ loading, user, fetchUser }}>{children}</UserInfoContext.Provider>;
};

export const useUserInfoContext = (): UserInfoContextType => {
    return useContext(UserInfoContext);
};
