import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { IDropValue, INewOffer, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { IBody } from './interfaces';

const adapter = (value: INewOffer, images: string[]): IBody => ({
    price: value.price,
    title: value.title,
    doc_needed: value.doc_needed,
    description: value.description,
    deposit_val: value.deposit_val,
    city: 'Kiev',
    currency: 'UAH',
    is_deliverable: value.is_deliverable,
    max_rent_period: value.max_rent_period,
    min_rent_period: value.min_rent_period,
    extra_requirements: value.extra_requirements,
    images: images || [],
    cover_image: images && images?.[0],
});

function* postOffer({ payload, callback }: IAction) {
    try {
        const form: INewOffer = yield select<(state: IState) => INewOffer>(state => state.offers.new_offer);
        const body: IBody = adapter(form, payload as string[]);
        body.category = (form.category as IDropValue)?.type === 'main' ? (form.category as IDropValue)?.slug : null;
        body.sub_category = (form.category as IDropValue)?.type === 'sub' ? (form.category as IDropValue)?.slug : null;

        const { status, data } = yield call(api.offers.new, body);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS, payload: { ...initState.offers.new_offer, id: data.id } });
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
