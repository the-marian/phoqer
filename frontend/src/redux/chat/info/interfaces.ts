import { IOfferCard } from '../../../interfaces';
import types from '../types';

type Type =
    | typeof types.GET_CHAT_OFFER_INFO_START
    | typeof types.GET_CHAT_OFFER_INFO_ERROR
    | typeof types.GET_CHAT_OFFER_INFO_SUCCESS;

export default interface IAction {
    type: Type;
    payload: IOfferCard | number;
}
