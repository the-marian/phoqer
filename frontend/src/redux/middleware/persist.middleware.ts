import Cookies from 'js-cookie';
import { HYDRATE } from 'next-redux-wrapper';
import { Middleware } from 'redux';

import notificationsModal from '../../components/common/modal/notifications-modal';
import { IAuth, IState } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers';
import initState from '../state';
import types from '../types';

const Persist: Middleware = store => next => action => {
    if (process.browser) {
        switch (action.type) {
            /**
             * LOGIN
             * */
            case types.LOGIN_SUCCESS:
                try {
                    const state: IState = store.getState();
                    Cookies.set('phoqer_auth', JSON.stringify({ ...state.auth, ...action.payload }), {
                        expires: addMonthToDate(1),
                    });
                } catch (error) {
                    notificationsModal('error');
                }
                next(action);
                break;

            /**
             * LOGOUT
             * */
            case types.LOGOUT_END:
                try {
                    Cookies.set('phoqer_auth', JSON.stringify(initState.auth), { expires: addMonthToDate(1) });
                } catch (error) {
                    notificationsModal('error');
                }
                next(action);
                break;

            /**
             * HYDRATE ACTION
             * */
            case HYDRATE:
                try {
                    // auth-form
                    const authStr: string | null = Cookies.get('phoqer_auth') || null;
                    const auth: IAuth = authStr ? JSON.parse(authStr) : initState.auth;

                    // next
                    next({
                        type: HYDRATE,
                        payload: { ...action.payload, auth },
                    });
                } catch (error) {
                    notificationsModal('error');
                    next(action);
                }
                break;

            default:
                next(action);
                break;
        }

        return;
    }

    next(action);
};

export default Persist;
