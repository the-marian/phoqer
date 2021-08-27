import { INewOffer, IState } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.PATCH_OFFER_START
    | typeof types.PATCH_EDIT_OFFER_STATUS_START
    | typeof types.PATCH_OFFER_SUCCESS
    | typeof types.PATCH_EDIT_OFFER_STATUS_SUCCESS
    | typeof types.PATCH_OFFER_ERROR
    | typeof types.PATCH_EDIT_OFFER_STATUS_ERROR;

export interface IValue {
    loading: boolean;
}

export default interface IAction {
    type: Type;
    payload: INewOffer | IState | string[] | string | null;
    images?: string[] | null;
    offerId?: string;
    callback?: (offerId?: string) => void;
    status: string;
}
