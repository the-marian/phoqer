import { ReactElement } from 'react';

import { IModal } from '../../interfaces';
import types from '../types';

export interface Action {
    type: typeof types.OPEN_MODAL | typeof types.CLOSE_MODAL;
    payload: IModal;
}

export const openModal = ({ dom, size }: { dom: ReactElement; size?: 's' | 'm' | 'l' }): Action => ({
    type: types.OPEN_MODAL,
    payload: { dom, size: size || 's', modal: true },
});

export const closeModal = (): Action => ({
    type: types.OPEN_MODAL,
    payload: { dom: null, size: 's', modal: false },
});
