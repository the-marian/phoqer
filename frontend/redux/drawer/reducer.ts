import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.TOGGLE_DRAWER;
    payload?: boolean | IState;
}

const drawer = (state = false, { type, payload }: IAction): boolean => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).drawer;

        case types.TOGGLE_DRAWER:
            return payload === undefined ? !state : (payload as boolean);

        default:
            return state;
    }
};

export default drawer;
