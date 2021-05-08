import React from 'react';

import { modal } from '../index';
import NotificationError from './error';
import NotificationSuccess from './success';

type ModalType = 'error' | 'success';

const notificationsModal = (type: ModalType, text?: string): void => {
    switch (type) {
        case 'error':
            modal.open(<NotificationError text={text} />);
            break;

        case 'success':
            modal.open(<NotificationSuccess text={text} />);
            break;

        default:
            break;
    }
};

export default notificationsModal;
