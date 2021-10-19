import { AxiosResponse } from 'axios';

import { NotificationsResponse, NotificationsType } from '../../interfaces';

const mock: NotificationsResponse = {
    total: 4,
    data: [
        {
            id: 1,
            notification_type: NotificationsType.RENT_START,
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            offer_title: 'offer_title',
            pub_date: '2021-10-17T21:24:21.520Z',
            recipient_id: 1,
            recipient_first_name: 'Firstname',
            recipient_last_name: 'Lastname',
            recipient_avatar: null,
            viewed: false,
        },
        {
            id: 2,
            notification_type: NotificationsType.RENT_CONFIRMED,
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            offer_title: 'offer_title',
            pub_date: '2021-10-17T21:24:21.520Z',
            recipient_id: 1,
            recipient_first_name: 'Firstname',
            recipient_last_name: 'Lastname',
            recipient_avatar: null,
            viewed: false,
        },
        {
            id: 3,
            notification_type: NotificationsType.RENT_CANCELLED,
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            offer_title: 'offer_title',
            pub_date: '2021-10-17T21:24:21.520Z',
            recipient_id: 1,
            recipient_first_name: 'Firstname',
            recipient_last_name: 'Lastname',
            recipient_avatar: null,
            viewed: true,
        },
        {
            id: 4,
            notification_type: NotificationsType.RENT_END,
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            offer_title: 'offer_title',
            pub_date: '2021-10-17T21:24:21.520Z',
            recipient_id: 1,
            recipient_first_name: 'Firstname',
            recipient_last_name: 'Lastname',
            recipient_avatar: null,
            viewed: false,
        },
        {
            id: 5,
            notification_type: NotificationsType.NEW_COMMENT,
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            offer_title: 'offer_title',
            pub_date: '2021-10-17T21:24:21.520Z',
            recipient_id: 1,
            recipient_first_name: 'Firstname',
            recipient_last_name: 'Lastname',
            recipient_avatar: null,
            viewed: false,
        },
    ],
};

const services = {
    // get: (page: number): Promise<AxiosResponse<NotificationsResponse>> =>
    //     axios.get(endpoint('/notifications'), { params: { page } }),

    get: (page: number): Promise<AxiosResponse<NotificationsResponse>> => {
        return new Promise<AxiosResponse<NotificationsResponse>>(resolve => {
            setTimeout(() => {
                console.log(page);
                resolve({
                    data: mock,
                    status: 200,
                    statusText: 'ok',
                    headers: {},
                    config: {},
                });
            }, 2000);
        });
    },
};

export default services;