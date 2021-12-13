import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const api = axios.create({});

api.interceptors.request.use(
    req => AxiosLogger.requestLogger(req, { data: false }),
    error => Promise.reject(error),
);

api.interceptors.response.use(
    res => AxiosLogger.responseLogger(res, { data: false }),
    error => Promise.reject(error),
);

export default api;
