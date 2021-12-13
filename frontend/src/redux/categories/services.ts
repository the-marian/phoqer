import { AxiosResponse } from 'axios';

import { ICategories } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    get: (): Promise<AxiosResponse<ICategories>> => api.get(endpoint('/categories')),
};

export default services;
