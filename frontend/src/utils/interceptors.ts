import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { Dispatch } from 'redux';

import types from '../redux/types';

const interceptors = (dispatch: Dispatch): void => {
    axios.interceptors.request.use(
        req => AxiosLogger.requestLogger(req, { data: false }),
        error => Promise.reject(error),
    );
    axios.interceptors.response.use(
        res => AxiosLogger.responseLogger(res, { data: false }),
        error => {
            if (error?.response?.status === 401) {
                dispatch({ type: types.LOGOUT_INIT });
            }

            return Promise.reject(error);
        },
    );
};

export default interceptors;
