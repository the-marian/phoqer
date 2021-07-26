import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

const chatDrawer = (state = false, { type, payload }: IAction): boolean => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).config.drawer;

        case types.TOGGLE_CHAT_DRAWER:
            return payload === undefined ? !state : (payload as boolean);

        default:
            return state;
    }
};

export default chatDrawer;
