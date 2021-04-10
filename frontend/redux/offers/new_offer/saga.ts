import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notifications from '../../../components/common/notifications';
import { IDropValue, INewOffer, IState } from '../../../interfaces';
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
            category: (category as IDropValue)?.type === 'main' ? (category as IDropValue)?.slug : null,
            sub_category: (category as IDropValue)?.type === 'sub' ? (category as IDropValue)?.slug : null,
        } as IBody);

        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.POST_OFFER_SUCCESS, payload: { ...initState.offers.new_offer, id: data.id } });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications('error');
        yield put({ type: types.POST_OFFER_ERROR });
    }
}

function* updateOffer({ payload, images, offerId, callback }: IAction) {
    try {
        const {
            title,
            price,
            category,
            doc_needed,
            deposit_val,
            description,
            sub_category,
            is_deliverable,
            max_rent_period,
            min_rent_period,
            extra_requirements,
        } = payload as INewOffer;

        const { status } = yield call(
            api.offers.update,
            offerId as string,
            {
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
                images: images || [],
                cover_image: images && (images as { url: string }[])?.[0]?.url,
                category_id: category || null,
                sub_category_id: sub_category || null,
            } as IBody,
        );

        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.PATCH_OFFER_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications('error');
        yield put({ type: types.PATCH_OFFER_ERROR });
    }
}

function* publishOffer({ payload, images, offerId, callback }: IAction) {
    try {
        const {
            title,
            price,
            category,
            doc_needed,
            deposit_val,
            description,
            sub_category,
            is_deliverable,
            max_rent_period,
            min_rent_period,
            extra_requirements,
        } = payload as INewOffer;

        const offer: { status: number } = yield call(
            api.offers.update,
            offerId as string,
            {
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
                images: images || [],
                cover_image: images && (images as { url: string }[])?.[0]?.url,
                category: category || null,
                sub_category: sub_category || null,
            } as IBody,
        );
        if (offer.status < 200 || offer.status >= 300) throw new Error();

        const status: { status: number } = yield call(api.offers.status, offerId as string, { status: 'REVIEW' });
        if (status.status < 200 || status.status >= 300) throw new Error();

        yield put({ type: types.PATCH_OFFER_STATUS_SUCCESS });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications('error');
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
