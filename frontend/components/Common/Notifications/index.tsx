import React from 'react';

import { modal } from '../Modal';
import NotificationError from './Error';
import NotificationSuccess from './Success';

type ModalType = 'error' | 'success';

const notifications = (type: ModalType, text: string): void => {
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

export default notifications;
