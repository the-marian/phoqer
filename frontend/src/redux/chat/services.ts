import axios, { AxiosResponse } from 'axios';

import { ChatStatus, ChatType, IChats, IMessages, IOfferCard, IPagination } from '../../interfaces';
import endpoint from '../../utils/endpoint';

import { INewChat } from './chats/interfaces';

const services = {
    chats: (page = 1, type: ChatType = 'i_am_client'): Promise<AxiosResponse<IPagination<IChats>>> =>
        axios.get(endpoint(`/chats?${type}=true`), { params: { page } }),
    singleChat: (id: number): Promise<AxiosResponse<IChats>> => axios.get(endpoint(`/chats/${id}`)),
    updateChat: (id: number, status: ChatStatus): Promise<AxiosResponse<void>> =>
        axios.patch(endpoint(`/chats/${id}`), { status }),
    createChat: (body: INewChat): Promise<AxiosResponse<INewChat>> => axios.post(endpoint('/chats'), body),
    messages: (id: number, page = 1): Promise<AxiosResponse<IPagination<IMessages>>> =>
        axios.get(endpoint(`/chats/${id}/messages`), { params: { page } }),
    offerInfo: (id: number): Promise<AxiosResponse<IOfferCard>> => axios.get(endpoint(`/offers/offers/${id}`)),
    deleteChat: (id: number): Promise<AxiosResponse<void>> => axios.delete(endpoint(`/chats/${id}`)),
};

export default services;
