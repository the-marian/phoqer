import axios, { AxiosResponse } from 'axios';

import { IPublicProfile } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    user: (): Promise<AxiosResponse<IPublicProfile>> => axios.get(endpoint('/users/me')),
    userUpdate: (body: Partial<IPublicProfile>): Promise<AxiosResponse<IPublicProfile>> =>
        axios.patch(endpoint('/users/me'), body),
    uploads: (form: FormData): Promise<AxiosResponse<{ image_url: string }>> =>
        axios.post(endpoint('/upload'), form, { headers: { 'content-type': 'multipart/form-data' } }),
};

export default services;
