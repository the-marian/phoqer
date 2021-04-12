import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../../../../interfaces';
import types from '../../../../redux/types';

const AuthInterceptor = (): null => {
    const token = useSelector<IState, string | null>(state => state.auth.access_token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            dispatch({ type: types.GET_USER_START });
        } else {
            delete axios.defaults.headers.common.Authorization;
        }
    }, [token]);

    return null;
};

export default AuthInterceptor;
