import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { encryptor } from '../../assets/encryptor';
import types from '../types';

interface IState {
    open: boolean;
}

interface IAction {
    type: typeof types.SEARCH_FILTERS;
    payload: IState;
}

const filters = (state: IState = { open: true }, { type, payload }: IAction): IState => {
    switch (type) {
        case types.SEARCH_FILTERS:
            return payload;

        default:
            return state;
    }
};

const config = {
    storage,
    key: 'phoqer_filter',
    white: ['open'],
    transforms: [encryptor],
};

export default persistReducer(config, filters);
