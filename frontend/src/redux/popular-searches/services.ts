import { AxiosResponse } from 'axios';

import { PopularSearches } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    get: (): Promise<AxiosResponse<PopularSearches>> => api.get(endpoint('/popular-searches')),
};

export default services;
