import axios, { AxiosResponse } from 'axios';

import { IAuth, ISignup } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    login: (form: FormData): Promise<AxiosResponse<IAuth>> => axios.post(endpoint('/auth/login'), form),
    signup: (body: ISignup): Promise<AxiosResponse<void>> => axios.post(endpoint('/users/signup'), body),
};
export default services;
