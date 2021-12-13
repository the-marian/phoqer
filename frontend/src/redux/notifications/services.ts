import { AxiosResponse } from 'axios';

import { NotificationsResponse } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    get: (page: number): Promise<AxiosResponse<NotificationsResponse>> =>
        api.get(endpoint('/notifications'), { params: { page } }),
    delete: (id: number): Promise<AxiosResponse<NotificationsResponse>> => api.delete(endpoint(`/notifications/${id}`)),
};

export default services;
