import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.GET_SINGLE_OFFER_START
    | typeof types.GET_SINGLE_OFFER_SUCCESS
    | typeof types.GET_SINGLE_OFFER_ERROR
    | typeof types.OFFER_DO_REVIEW_ERROR
    | typeof types.OFFER_DO_REVIEW_SUCCESS
    | typeof types.OFFER_DO_REVIEW_START;

export default interface IAction {
    type: Type;
    payload: IState | IOfferCard | string | string[] | null;
}
