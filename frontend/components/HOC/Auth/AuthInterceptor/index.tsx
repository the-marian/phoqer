import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import types from '../../../../redux/types';
import useAuth from '../../../../hooks/auth.hook';

const AuthInterceptor = (): null => {
    const dispatch = useDispatch();
    const auth = useAuth();

    useEffect(() => {
        if (auth?.auth_token) {
            axios.defaults.headers.common.Authorization = `Token ${auth?.auth_token}`;
            dispatch({ type: types.GET_USER_START });
        } else {
            delete axios.defaults.headers.common.Authorization;
        }
    }, [auth]);

    return null;
};

export default AuthInterceptor;
