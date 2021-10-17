import { INewOffer, IState } from '../../../interfaces';
import types from '../types';

type Type =
    | typeof types.NEW_OFFER_FORM
    | typeof types.POST_OFFER_SUCCESS
    | typeof types.POST_OFFER_START
    | typeof types.POST_OFFER_SUCCESS
    | typeof types.POST_OFFER_ERROR;

export interface IBody {
    title: string;
    price: number | string | null;
    is_deliverable: boolean;
    doc_needed: boolean;
    description: string;
    deposit_val: number | string | null;
    min_rent_period: number | string | null;
    max_rent_period: number | string | null;
    extra_requirements: string;
    items_amount: number | string | null;
    rental_period: string | null;
    city: string | null;
    country: string | null;
    currency: string;
    images: string[];
    cover_image: string | null;
    category?: string | null;
    sub_category?: string | null;
    category_id?: string | null;
    sub_category_id?: string | null;
}

export default interface IAction {
    type: Type;
    payload: INewOffer | IState | string[] | string;
    images?: string[] | null;
    offerId?: string;
    callback?: (offerId?: string) => void;
}
