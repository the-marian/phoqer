import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { IDropValue, INewOffer, IState } from '../../../interfaces';
import types from '../../types';
import { IBody } from '../new_offer/interfaces';
import IAction from './interfaces';

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
    cover_image: value.cover_image || images?.[0] || '',
});

function* updateOffer({ payload, images, offerId, callback }: IAction) {
    try {
        const cover_image: string | undefined = yield select<(state: IState) => string | undefined>(
            state => state.offers.single?.cover_image,
        );
        const body: IBody = adapter({ ...(payload as INewOffer), cover_image }, images as string[]);
        body.category =
            ((payload as INewOffer).category as IDropValue)?.type === 'main'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;
        body.sub_category =
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
        const cover_image: string | undefined = yield select<(state: IState) => string | undefined>(
            state => state.offers.single?.cover_image,
        );
        const body: IBody = adapter({ ...(payload as INewOffer), cover_image }, images as string[]);
        body.category =
            ((payload as INewOffer).category as IDropValue)?.type === 'main'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;
        body.sub_category =
            ((payload as INewOffer).category as IDropValue)?.type === 'sub'
                ? ((payload as INewOffer).category as IDropValue)?.slug
                : null;

        const offer: { status: number } = yield call(api.offers.update, offerId as string, body);
        if (offer.status < 200 || offer.status >= 300) throw new Error();

        const status: { status: number } = yield call(api.offers.status, offerId as string, { status: 'REVIEW' });
        if (status.status < 200 || status.status >= 300) throw new Error();

        yield put({ type: types.PATCH_EDIT_OFFER_STATUS_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PATCH_EDIT_OFFER_STATUS_ERROR });
    }
}

function* changeCoverImage({ payload, offerId, callback }: IAction) {
    try {
        const { status } = yield call(api.offers.update, offerId as string, { cover_image: payload as string } as Partial<Body>);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.CHANGE_OFFER_COVER_IMAGE_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.CHANGE_OFFER_COVER_IMAGE_ERROR });
    }
}

function* changeOfferStatus({ status, offerId, callback }: IAction) {
    try {
        const res: AxiosResponse<void> = yield call(api.offers.status, offerId as string, { status });
        if (res.status < 200 || res.status >= 300) throw new Error();
        yield put({ type: types.CHANGE_OFFER_STATUS_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.CHANGE_OFFER_STATUS_ERROR });
    }
}

export default function* edit_offer(): Generator {
    yield all([
        takeLatest(types.PATCH_OFFER_START, updateOffer),
        takeLatest(types.PATCH_EDIT_OFFER_STATUS_START, publishOffer),
        takeLatest(types.CHANGE_OFFER_COVER_IMAGE_START, changeCoverImage),
        takeLatest(types.CHANGE_OFFER_STATUS_START, changeOfferStatus),
    ]);
}
