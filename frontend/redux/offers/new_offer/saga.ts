import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { IDropValue, INewOffer, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { IBody, IImage } from './interfaces';

const adapter = (value: INewOffer, images: IImage[]): IBody => ({
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
    cover_image: images && images?.[0]?.url,
});

function* postOffer({ payload, callback }: IAction) {
    try {
        const form: INewOffer = yield select<(state: IState) => INewOffer>(state => state.offers.new_offer);
        const body: IBody = adapter(form, payload as { url: string }[]);
        body.category = (form.category as IDropValue)?.type === 'main' ? (form.category as IDropValue)?.slug : null;
        body.sub_category = (form.category as IDropValue)?.type === 'sub' ? (form.category as IDropValue)?.slug : null;

        const { status, data } = yield call(api.offers.new, body);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS, payload: { ...initState.offers.new_offer, id: data.id } });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.POST_OFFER_ERROR });
    }
}

function* updateOffer({ payload, images, offerId, callback }: IAction) {
    try {
        const body: IBody = adapter(payload as INewOffer, images as IImage[]);
        body.category_id =
            ((payload as INewOffer).category as IDropValue)?.type === 'main'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;
        body.sub_category_id =
            ((payload as INewOffer).category as IDropValue)?.type === 'sub'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;

        const { status } = yield call(api.offers.update, offerId as string, body);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.PATCH_OFFER_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PATCH_OFFER_ERROR });
    }
}

function* publishOffer({ payload, images, offerId, callback }: IAction) {
    try {
        const body: IBody = adapter(payload as INewOffer, images as IImage[]);
        body.category_id =
            ((payload as INewOffer).category as IDropValue)?.type === 'main'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;
        body.sub_category_id =
            ((payload as INewOffer).category as IDropValue)?.type === 'sub'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;

        const offer: { status: number } = yield call(api.offers.update, offerId as string, body);
        if (offer.status < 200 || offer.status >= 300) throw new Error();

        const status: { status: number } = yield call(api.offers.status, offerId as string, { status: 'REVIEW' });
        if (status.status < 200 || status.status >= 300) throw new Error();

        yield put({ type: types.PATCH_OFFER_STATUS_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PATCH_OFFER_STATUS_ERROR });
    }
}

export default function* new_offer(): Generator {
    yield all([
        takeLatest(types.POST_OFFER_START, postOffer),
        takeLatest(types.PATCH_OFFER_START, updateOffer),
        takeLatest(types.PATCH_OFFER_STATUS_START, publishOffer),
    ]);
}
