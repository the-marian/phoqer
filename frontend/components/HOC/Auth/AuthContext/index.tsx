import React, { createContext, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IAuth, IState } from '../../../../interfaces';

export const Auth = createContext<[value: IAuth | null, setValue: ((t: IAuth | null) => void) | null]>([null, null]);

interface IProps {
    authServer?: IAuth | null;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const AuthProvider = ({ authServer = null, children }: IProps): ReactElement => {
    const [value, setValue] = useState<IAuth | null>(null);
    const auth = useSelector<IState, IAuth>(state => state.auth);

    useEffect(() => {
        setValue(auth || authServer);
    }, [auth, authServer]);

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default React.memo(AuthProvider);
