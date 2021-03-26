import { Params } from 'next/dist/next-server/server/router';

import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

export default interface IAction {
    type:
        | typeof types.SEARCH_OFFERS_START
        | typeof types.SEARCH_OFFERS_ERROR
        | typeof types.SEARCH_OFFERS_SUCCESS
        | typeof types.SEARCH_OFFERS_PAGINATION_START
        | typeof types.SEARCH_OFFERS_PAGINATION_ERROR
        | typeof types.SEARCH_OFFERS_PAGINATION_SUCCESS;
    payload: IOfferCard[] | IState | Params | string | null;
}
