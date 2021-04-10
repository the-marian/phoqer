import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { INewOffer, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { IBody } from './interfaces';

function* postOffer({ payload, callback }: IAction) {
    try {
        const form: INewOffer = yield select<(state: IState) => INewOffer>(state => state.offers.new_offer);

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

        const { status, data } = yield call(api.offers.new, {
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
            images: payload || [],
            cover_image: payload && (payload as { url: string }[])?.[0]?.url,
            category: category?.type !== 'sub' ? category?.slug : null,
            sub_category: category?.type === 'sub' ? category?.slug : null,
        } as IBody);

        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS, payload: { ...initState.offers.new_offer, id: data.id } });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.POST_OFFER_ERROR });
    }
}

export default function* new_offer(): Generator {
    yield takeLatest(types.POST_OFFER_START, postOffer);
}
