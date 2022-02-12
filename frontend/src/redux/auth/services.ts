import { AxiosResponse } from 'axios';

import api from '../../api';
import { IAuthResponse, ISignup } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    login: (form: FormData): Promise<AxiosResponse<IAuthResponse>> => api.post(endpoint('/auth/login'), form),
    signup: (body: ISignup): Promise<AxiosResponse<void>> => api.post(endpoint('/users/signup'), body),
};
export default services;
