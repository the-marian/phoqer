import { HYDRATE } from 'next-redux-wrapper';

import { IState, NotificationsResponse, NotificationsState } from '../../interfaces';
import types from '../types';

import notificationsInit from './init-state';
import IAction from './interfaces';

const notifications = (state: NotificationsState = notificationsInit, { type, payload }: IAction): NotificationsState => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).notifications;

        case types.GET_NOTIFICATIONS_START:
            return { ...state, loading: true };

        case types.GET_NOTIFICATIONS_SUCCESS:
            return { ...state, data: payload as NotificationsResponse };

        case types.GET_NOTIFICATIONS_PAGINATION_SUCCESS:
            return {
                ...state,
                data: {
                    total: (payload as NotificationsResponse).total,
                    data: [...state.data.data, ...(payload as NotificationsResponse).data],
                },
            };

        case types.GET_NOTIFICATIONS_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default notifications;
