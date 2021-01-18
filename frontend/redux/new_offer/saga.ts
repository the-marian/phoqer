import { NextRouter } from 'next/router';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import routes from '../../assets/routes';
import { INewOffer, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.POST_OFFER_START | typeof types.POST_OFFER_SUCCESS | typeof types.POST_OFFER_ERROR;
    payload: { url: string }[] | null;
    history: NextRouter;
}

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

function* postOffer({ payload, history }: IAction) {
    try {
        const form = yield select<(state: IState) => INewOffer>(state => state.newOffer);

        const {
            title,
            price,
            category,
            doc_needed,
            deposit_val,
            description,
            is_deliverable,
            max_rent_period,
            min_rent_period,
            extra_requirements,
        } = form as INewOffer;

        const { status, data } = yield call(api.offers.new.post, {
            price,
            title,
            doc_needed,
            description,
            deposit_val,
            city: 'Kiev',
            is_deliverable,
            max_rent_period,
            min_rent_period,
            extra_requirements,
            images: payload,
            cover_image: payload?.[0]?.url,
            category: category.type !== 'sub' ? category.slug : null,
            sub_category: category.type === 'sub' ? category.slug : null,
        } as IBody);

        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS, payload: data });
        history.replace(routes.new_offer(4));
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.POST_OFFER_ERROR });
    }
}

export default function* newOffer(): Generator {
    yield takeLatest(types.POST_OFFER_START, postOffer);
}
