import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { ISearchHiddenBlocks } from './interfaces';

const searchHiddenBlocks = (
    state: ISearchHiddenBlocks = initState.config.searchHiddenBlocks,
    { type, payload }: IAction,
): ISearchHiddenBlocks => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).config.searchHiddenBlocks;

        case types.OFFERS_HIDE_POPULAR_SEARCH:
            return { ...state, popularSearch: payload === undefined ? !state.popularSearch : (payload as boolean) };

        case types.OFFERS_HIDE_FILTERS:
            return { ...state, filters: payload === undefined ? !state.filters : (payload as boolean) };

        case types.OFFERS_HIDE_TOP:
            return { ...state, hideTop: payload === undefined ? !state.hideTop : (payload as boolean) };

        default:
            return state;
    }
};

export default searchHiddenBlocks;
