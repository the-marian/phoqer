import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAuth, IState } from '../../../interfaces';
import types from '../../../redux/types';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const AuthHOC = ({ children }: Props): JSX.Element => {
    const dispatch = useDispatch();
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);
    const isLogin = auth_token && axios.defaults.headers.common.Authorization;

    useEffect(() => {
        if (auth_token) {
            axios.defaults.headers.common.Authorization = `Token ${auth_token}`;
        }
    }, [auth_token]);

    useEffect(() => {
        if (isLogin) {
            dispatch({ type: types.GET_USER_START });
        }
    }, [dispatch, isLogin]);

    return <>{children}</>;
};

export default AuthHOC;
