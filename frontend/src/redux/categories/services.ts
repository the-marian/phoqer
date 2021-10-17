import axios, { AxiosResponse } from 'axios';

import { ICategories } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    get: (): Promise<AxiosResponse<ICategories>> => axios.get(endpoint('/categories')),
};

export default services;
