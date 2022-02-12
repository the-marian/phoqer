import { AxiosResponse } from 'axios';

import api from '../../api';
import { ICategories } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (): Promise<AxiosResponse<ICategories>> => api.get(endpoint('/categories')),
};

export default services;
