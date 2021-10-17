import { IPagination } from './general';

export enum NotificationsType {
    RENT_START = 'RENT_START',
}

export interface INotifications {
    id: number;
    notification_type: NotificationsType;
    body: string;
    offer_id?: string;
    pub_date: string;
    recipient_id: number;
    viewed: boolean;
}

export type NotificationsResponse = IPagination<INotifications>;

export type NotificationsState = {
    loading: boolean;
    data: NotificationsResponse;
};
