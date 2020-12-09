import { IModal } from '../../interfaces';
import types from '../types';
import { Action } from './actions';

const modal = (state: IModal = { dom: null, size: 's', modal: false }, { type, payload }: Action): IModal => {
    switch (type) {
        case types.OPEN_MODAL:
            return payload;

        case types.CLOSE_MODAL:
            return payload;

        default:
            return state;
    }
};

export default modal;
