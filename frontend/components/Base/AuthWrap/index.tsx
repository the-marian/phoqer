import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IAuth, IState } from '../../../interfaces';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const AuthWrap = ({ children }: Props): ReactElement => {
    const history = useRouter();
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);
    const isLogin = auth_token && axios.defaults.headers.common.Authorization;
    if (!isLogin) {
        history.replace('/login');
        return null;
    }

    return <>{children}</>;
};

export default AuthWrap;
