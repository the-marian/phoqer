import axios, { AxiosResponse } from 'axios';

import { IComment } from '../../interfaces';
import endpoint from '../../utils/endpoint';

interface ICommentBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

const services = {
    list: (id: string): Promise<AxiosResponse<IComment[]>> => axios.get(endpoint(`/comments/${id}`)),
    create: (body: ICommentBody): Promise<AxiosResponse<void>> => axios.post(endpoint('/comments'), body),
    delete: (id: number): Promise<AxiosResponse<void>> => axios.delete(endpoint(`/comments/${id}`)),
    like: (id: number): Promise<AxiosResponse<void>> => axios.patch(endpoint(`/comments/${id}/like`)),
    dislike: (id: number): Promise<AxiosResponse<void>> => axios.patch(endpoint(`/comments/${id}/dislike`)),
};

export default services;
