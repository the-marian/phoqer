import { NextRouter } from 'next/router';

import { INewOffer, IState } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.NEW_OFFER_FORM
    | typeof types.POST_OFFER_SUCCESS
    | typeof types.POST_OFFER_START
    | typeof types.POST_OFFER_SUCCESS
    | typeof types.POST_OFFER_ERROR;

export interface IBody {
    title: string;
    price: number | null;
    is_deliverable: boolean;
    doc_needed: boolean;
    description: string;
    deposit_val: number | null;
    min_rent_period: number | null;
    max_rent_period: number | null;
    extra_requirements: string;
    city: 'Kiev';
    currency: string;
    images: { url: string }[];
    cover_image: string;
    category: string | null;
    sub_category: string | null;
}

export default interface IAction {
    type: Type;
    payload: INewOffer | IState | { url: string }[] | null;
    history: NextRouter;
}
