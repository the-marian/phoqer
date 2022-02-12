import { AxiosResponse } from 'axios';

import api from '../../api';
import { IPublicProfile } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (id: number): Promise<AxiosResponse<IPublicProfile>> => api.get(endpoint(`/users/${id}`)),
};

export default services;
