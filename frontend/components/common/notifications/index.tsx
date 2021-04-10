import React from 'react';

import { modal } from '../modal';
import NotificationError from './error';
import NotificationSuccess from './success';

type ModalType = 'error' | 'success';

const notifications = (type: ModalType, text?: string): void => {
    switch (type) {
        case 'error':
            modal.open(
                <NotificationError text={text || 'Oops, Something went wrong. Please, reload your browser and try again'} />,
            );
            break;

        case 'success':
            modal.open(<NotificationSuccess text={text || 'Success'} />);
            break;

        default:
            break;
    }
};

export default notifications;
