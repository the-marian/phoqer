import types from '../../types';

export interface IOffers {
    filters: boolean;
    popularSearch: boolean;
    hideTop: boolean;
}

export default interface IAction {
    type: typeof types.OFFERS_HIDE_POPULAR_SEARCH | typeof types.OFFERS_HIDE_FILTERS | typeof types.OFFERS_HIDE_TOP;
    payload?: boolean | IOffers;
}
