import { HYDRATE } from 'next-redux-wrapper';

import { IState, PopularSearches } from '../../interfaces';

import popularSearchesInit from './init-state';
import IAction from './interfaces';
import types from './types';

const popularSearches = (state: PopularSearches = popularSearchesInit, { type, payload }: IAction): PopularSearches => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).popularSearches;

        case types.GET_POPULAR_SEARCHES_SUCCESS:
            return payload as PopularSearches;

        case types.GET_POPULAR_SEARCHES_START:
        case types.GET_POPULAR_SEARCHES_ERROR:
            return state;

        default:
            return state;
    }
};

export default popularSearches;
