import { AxiosResponse } from 'axios';

import { IPublicProfile } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    user: (): Promise<AxiosResponse<IPublicProfile>> => api.get(endpoint('/users/me')),
    userUpdate: (body: Partial<IPublicProfile>): Promise<AxiosResponse<IPublicProfile>> => api.patch(endpoint('/users/me'), body),
    uploads: (form: FormData): Promise<AxiosResponse<{ image_url: string }>> =>
        api.post(endpoint('/upload'), form, { headers: { 'content-type': 'multipart/form-data' } }),
};

export default services;
