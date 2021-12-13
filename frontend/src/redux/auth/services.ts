import { AxiosResponse } from 'axios';

import { IAuthResponse, ISignup } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    login: (form: FormData): Promise<AxiosResponse<IAuthResponse>> => api.post(endpoint('/auth/login'), form),
    signup: (body: ISignup): Promise<AxiosResponse<void>> => api.post(endpoint('/users/signup'), body),
};
export default services;
