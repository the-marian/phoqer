import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { IDropValue, INewOffer, IRegion, IState } from '../../../interfaces';
import types from '../../types';
import IAction, { IBody } from './interfaces';

const adapter = (value: INewOffer, images: string[] | null): IBody => ({
    price: value.price,
    title: value.title,
    doc_needed: value.doc_needed,
    description: value.description,
    deposit_val: value.deposit_val,
    city: value.city || null,
    country: value.country || null,
    currency: value.currency?.slug || 'UAH',
    is_deliverable: value.is_deliverable,
    max_rent_period: value.max_rent_period,
    min_rent_period: value.min_rent_period,
    extra_requirements: value.extra_requirements,
    items_amount: value.items_amount || 1,
    rental_period: value.rental_period?.slug || 'DAY',
    images: images || [],
    cover_image: images?.[0] || null,
});

function* postOffer({ payload, callback }: IAction) {
    try {
        const region: IRegion = yield select<(state: IState) => IRegion>(state => state.region);
        const form: INewOffer = yield select<(state: IState) => INewOffer>(state => state.offers.new_offer);
        const body: IBody = adapter(
            { ...form, city: region.selected?.city || null, country: region.selected?.country || null },
            payload as string[] | null,
        );
        body.category = (form.category as IDropValue)?.type === 'main' ? (form.category as IDropValue)?.slug : null;
        body.sub_category = (form.category as IDropValue)?.type === 'sub' ? (form.category as IDropValue)?.slug : null;

        const { status, data } = yield call(api.offers.new, body);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS });
        if (callback) callback(data.id);
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.POST_OFFER_ERROR });
    }
}

export default function* new_offer(): Generator {
    yield takeLatest(types.POST_OFFER_START, postOffer);
}
