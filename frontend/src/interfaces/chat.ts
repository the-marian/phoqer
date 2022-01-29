import { IPagination } from './general';
import { IOfferCard } from './offers';

export enum ChatStatus {
    APPROVED = 'APPROVED',
    ARCHIVED = 'ARCHIVED',
    NEW = 'NEW',
}

export enum ChatTypeEnum {
    CLIENT = 'i_am_client',
    AUTHOR = 'i_am_author',
}

export interface IChats {
    chat_id: number;
    title: string;
    status: ChatStatus;
    recipient_id: number;
    recipient_first_name: string;
    recipient_last_name: string;
    recipient_last_activity: string;
    new_messages: number;
    cover_image: string | null;
}

export interface IChatsList {
    loading: boolean;
    type: ChatTypeEnum;
    data: IPagination<IChats>;
}

export interface IMessages {
    id: number;
    text: string;
    creation_datetime: string;
    is_red: boolean;
    user_id: number;
    first_name: string;
    last_name: string;
    profile_img: string | null;
    uploads: string[];
}

export interface IMessagesList {
    loading: boolean;
    data: IPagination<IMessages>;
}

export interface IChatOfferInfo {
    loading: boolean;
    data: IOfferCard | null;
}

export interface IChatItem {
    loading: boolean;
    data: { chat_id: number; status: ChatStatus } | null;
}

export interface IStateChats {
    chats: IChatsList;
    item: IChatItem;
    messages: IMessagesList;
    info: IChatOfferInfo;
}
