import { AxiosResponse } from 'axios';

import { ChatStatus, ChatTypeEnum, IChats, IMessages, IOfferCard, IPagination } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

import { INewChat } from './chats/interfaces';

const services = {
    chats: (page = 1, type: ChatTypeEnum = ChatTypeEnum.CLIENT): Promise<AxiosResponse<IPagination<IChats>>> =>
        api.get(endpoint(`/chats?${type}=true`), { params: { page } }),
    singleChat: (id: number): Promise<AxiosResponse<IChats>> => api.get(endpoint(`/chats/${id}`)),
    updateChat: (id: number, status: ChatStatus): Promise<AxiosResponse<void>> => api.patch(endpoint(`/chats/${id}`), { status }),
    createChat: (body: INewChat): Promise<AxiosResponse<INewChat>> => api.post(endpoint('/chats'), body),
    messages: (id: number, page = 1): Promise<AxiosResponse<IPagination<IMessages>>> =>
        api.get(endpoint(`/chats/${id}/messages`), { params: { page } }),
    offerInfo: (id: number): Promise<AxiosResponse<IOfferCard>> => api.get(endpoint(`/offers/offers/${id}`)),
    deleteChat: (id: number): Promise<AxiosResponse<void>> => api.delete(endpoint(`/chats/${id}`)),
};

export default services;
