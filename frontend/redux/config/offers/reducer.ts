import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { IOffers } from './interfaces';

const offers = (state: IOffers = initState.config.offers, { type, payload }: IAction): IOffers => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).config.offers;

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

export default offers;
