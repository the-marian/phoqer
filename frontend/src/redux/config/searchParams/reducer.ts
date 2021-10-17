import { HYDRATE } from 'next-redux-wrapper';

import { ISearch, IState } from '../../../interfaces';
import configInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const searchParams = (state: ISearch = configInit.searchParams, { type, payload }: IAction): ISearch => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).config.searchParams;

        case types.OFFERS_SEARCH_LOCAL_PARAMS:
            return payload as ISearch;

        default:
            return state;
    }
};

export default searchParams;
