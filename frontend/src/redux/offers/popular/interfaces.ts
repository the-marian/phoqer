import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

export default interface IAction {
    type: typeof types.GET_POPULAR_OFFERS_START | typeof types.GET_POPULAR_OFFERS_ERROR | typeof types.GET_POPULAR_OFFERS_SUCCESS;
    payload: IOfferCard[] | IState | string | null;
}
