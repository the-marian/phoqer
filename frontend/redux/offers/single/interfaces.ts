import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

type Type = typeof types.GET_SINGLE_OFFER_START | typeof types.GET_SINGLE_OFFER_SUCCESS | typeof types.GET_SINGLE_OFFER_ERROR;

export default interface IAction {
    type: Type;
    payload: string | IState | IOfferCard | null;
}
