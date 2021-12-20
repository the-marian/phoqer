import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../components/common/modal/notifications-modal';
import notifications from '../../components/common/notifications';
import { IPublicProfile } from '../../interfaces';
import types from '../types';

import IAction from './interfaces';
import services from './services';

function* getUser() {
    try {
        const { status, data } = yield call(services.user);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_USER_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_USER_ERROR });
    }
}

function* updateUser({ payload, callback }: IAction) {
    try {
        const { status } = yield call(services.userUpdate, payload as Partial<IPublicProfile>);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.UPDATE_USER_SUCCESS });
        notifications.info({ message: 'your_changes_saved' });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.UPDATE_USER_ERROR });
    } finally {
        if (callback) callback();
    }
}

function* updateAvatar({ payload, callback }: IAction) {
    try {
        // upload image
        const form = new FormData();
        form.append('file', payload as File);
        const { status, data }: AxiosResponse<{ image_url: string }> = yield call(services.uploads, form);
        if (status < 200 || status >= 300) throw new Error();

        yield put({ type: types.UPDATE_USER_AVATAR_SUCCESS });
        yield put({
            type: types.UPDATE_USER_START,
            payload: {
                profile_img: data.image_url,
            },
            callback,
        });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.UPDATE_USER_AVATAR_ERROR });
    }
}

export default function* user(): Generator {
    yield all([
        takeLatest(types.GET_USER_START, getUser),
        takeLatest(types.UPDATE_USER_START, updateUser),
        takeLatest(types.UPDATE_USER_AVATAR_START, updateAvatar),
    ]);
}
