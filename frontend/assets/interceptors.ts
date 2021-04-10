import axios from 'axios';
import { NextRouter } from 'next/router';
import { Dispatch } from 'redux';

import types from '../redux/types';
import routes from './routes';

const interceptors = ({ history, dispatch }: { history: NextRouter; dispatch: Dispatch }): void => {
    axios.interceptors.request.use(
        config => config,
        error => Promise.reject(error),
    );
    axios.interceptors.response.use(
        response => {
            if (response.config.url === '/auth/token/login/') {
                const bearerToken = response.data.access_token;
                if (bearerToken) axios.defaults.headers.common.Authorization = `Bearer ${bearerToken}`;
                history.replace(routes.root);
            }
            return response;
        },
        error => {
            if (error?.response?.status === 401) delete axios.defaults.headers.common.Authorization;
            dispatch({ type: types.LOGOUT_END });
            return Promise.reject(error);
        },
    );
};

export default interceptors;
