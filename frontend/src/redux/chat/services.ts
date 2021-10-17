import axios, { AxiosResponse } from 'axios';

import { ChatType, IChats, IMessages, IOfferCard, IPagination } from '../../interfaces';
import endpoint from '../../utils/endpoint';

import { INewChat } from './chats/interfaces';

const services = {
    chats: (page = 1, type: ChatType = 'i_am_client'): Promise<AxiosResponse<IPagination<IChats>>> =>
        axios.get(endpoint(`/chats?${type}=true`), { params: { page } }),
    singleChat: (id: number | string): Promise<AxiosResponse<IPagination<IChats>>> => axios.get(endpoint(`/chats/${id}`)),
    createChat: (body: INewChat): Promise<AxiosResponse<INewChat>> => axios.post(endpoint('/chats'), body),
    messages: (id: number, page = 1): Promise<AxiosResponse<IPagination<IMessages>>> =>
        axios.get(endpoint(`/chats/${id}`), { params: { page } }),
    offerInfo: (id: number): Promise<AxiosResponse<IOfferCard>> => axios.get(endpoint(`/offers/offers/${id}`)),
};

export default services;
