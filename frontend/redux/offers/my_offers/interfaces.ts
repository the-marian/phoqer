import { Params } from 'next/dist/next-server/server/router';

import { IOfferCard, IOfferPagination, IState } from '../../../interfaces';
import types from '../../types';

export interface IParams {
    tab: string;
    params: Params;
}

export default interface IAction {
    type:
        | typeof types.MY_OFFERS_START
        | typeof types.MY_OFFERS_ERROR
        | typeof types.MY_OFFERS_SUCCESS
        | typeof types.MY_OFFERS_PAGINATION_START
        | typeof types.MY_OFFERS_PAGINATION_ERROR
        | typeof types.MY_OFFERS_PAGINATION_SUCCESS;
    payload: IOfferCard[] | IState | IParams | IOfferPagination | null;
}
