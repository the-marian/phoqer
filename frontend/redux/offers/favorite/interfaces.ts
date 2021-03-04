import { IOfferCard, IOfferStatic, IState } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.GET_SINGLE_OFFER_START
    | typeof types.GET_SINGLE_OFFER_SUCCESS
    | typeof types.GET_SINGLE_OFFER_ERROR
    | typeof types.PATCH_FAVORITE_OFFERS_START
    | typeof types.PATCH_FAVORITE_OFFERS_SUCCESS
    | typeof types.PATCH_FAVORITE_OFFERS_ERROR;

export default interface IAction {
    type: Type;
    payload: IState | IOfferStatic | IOfferCard[] | string;
}
