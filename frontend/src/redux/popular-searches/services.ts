import { AxiosResponse } from 'axios';

import api from '../../api';
import { PopularSearches } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (): Promise<AxiosResponse<PopularSearches>> => api.get(endpoint('/popular-searches')),
};

export default services;
