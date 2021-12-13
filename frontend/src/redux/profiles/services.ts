import { AxiosResponse } from 'axios';

import { IPublicProfile } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    get: (id: number): Promise<AxiosResponse<IPublicProfile>> => api.get(endpoint(`/users/${id}`)),
};

export default services;
