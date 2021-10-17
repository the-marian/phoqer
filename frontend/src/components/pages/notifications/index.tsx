import React, { ReactElement, useEffect } from 'react';

import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IState, NotificationsState } from '../../../interfaces';
import types from '../../../redux/types';
import { Theme } from '../../../utils/theming/theme';
import EmptyOffers from '../../common/offers/empty-offers';

import NotificationsContainer from './components/notifications-container';

const useStyles = createUseStyles((theme: Theme) => ({}));

const Notifications = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { loading, data: notificationsData } = useSelector<IState, NotificationsState>(state => state.notifications);

    useEffect(() => {
        dispatch({ type: types.GET_NOTIFICATIONS_START, payload: 1 });
    }, [dispatch]);

    return <NotificationsContainer>{loading ? <EmptyOffers /> : <EmptyOffers />}</NotificationsContainer>;
};

export default Notifications;
