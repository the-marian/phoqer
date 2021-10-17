import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../../interfaces';
import configInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const chatDrawer = (state = configInit.chatDrawer, { type, payload }: IAction): boolean => {
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
