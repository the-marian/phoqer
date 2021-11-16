import { IPagination } from './general';

export enum NotificationsType {
    RENT_REQUEST = 'RENT_REQUEST',
    RENT_END = 'RENT_END',
    RENT_CONFIRMED = 'RENT_CONFIRMED',
    RENT_CANCELLED = 'RENT_CANCELLED',
    NEW_COMMENT = 'NEW_COMMENT',
}

export interface INotificationBase {
    id: number;
    offer_id: string;
    offer_title: string;
    pub_date: string;
    recipient_id: number;
    recipient_first_name: string;
    recipient_last_name: string;
    recipient_avatar: string | null;
    viewed: boolean;
}

export interface INotificationRentStart extends INotificationBase {
    notification_type: NotificationsType.RENT_REQUEST;
}

export type INotificationRentConfirmation = INotificationBase & {
    notification_type: NotificationsType.RENT_CONFIRMED;
};

export type INotificationRentCancelled = INotificationBase & {
    notification_type: NotificationsType.RENT_CANCELLED;
};

export interface INotificationRentEnd extends INotificationBase {
    notification_type: NotificationsType.RENT_END;
}

export interface INotificationNewComment extends INotificationBase {
    notification_type: NotificationsType.NEW_COMMENT;
}

export type INotification =
    | INotificationRentStart
    | INotificationRentEnd
    | INotificationRentConfirmation
    | INotificationRentCancelled
    | INotificationNewComment;

export type NotificationsResponse = IPagination<INotification>;

export type NotificationsState = {
    loading: boolean;
    data: NotificationsResponse;
};
