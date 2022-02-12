import { AxiosResponse } from 'axios';

import api from '../../api';
import { IComment } from '../../interfaces';
import endpoint from '../../utils/endpoint';

interface ICommentBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

const services = {
    list: (id: string): Promise<AxiosResponse<IComment[]>> => api.get(endpoint(`/comments/${id}`)),
    create: (body: ICommentBody): Promise<AxiosResponse<void>> => api.post(endpoint('/comments'), body),
    delete: (id: number): Promise<AxiosResponse<void>> => api.delete(endpoint(`/comments/${id}`)),
    like: (id: number): Promise<AxiosResponse<void>> => api.patch(endpoint(`/comments/${id}/like`)),
    dislike: (id: number): Promise<AxiosResponse<void>> => api.patch(endpoint(`/comments/${id}/dislike`)),
};

export default services;
