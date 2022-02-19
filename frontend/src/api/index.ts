import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const api = axios.create({});

api.interceptors.request.use(
    req => {
        if (process.browser) return req;
        return AxiosLogger.requestLogger(req, { data: false });
    },
    error => Promise.reject(error),
);

api.interceptors.response.use(
    res => {
        if (process.browser) return res;
        return AxiosLogger.responseLogger(res, { data: false });
    },
    error => Promise.reject(error),
);

export default api;
