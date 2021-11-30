import axios, { AxiosResponse } from 'axios';

import { PopularSearches } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (): Promise<AxiosResponse<PopularSearches>> => axios.get(endpoint('/popular-searches')),
};

export default services;
