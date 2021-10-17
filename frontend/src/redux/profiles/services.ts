import axios, { AxiosResponse } from 'axios';

import { IPublicProfile } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (id: number): Promise<AxiosResponse<IPublicProfile>> => axios.get(endpoint(`/users/${id}`)),
};

export default services;
