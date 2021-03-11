import Cookies from 'js-cookie';
import { HYDRATE } from 'next-redux-wrapper';
import { Middleware } from 'redux';

import notifications from '../components/Common/Notifications';
import { IAuth, INewOffer, IState } from '../interfaces';
import initState from '../redux/state';
import types from '../redux/types';

const Persist: Middleware = store => next => action => {
    if (process.browser) {
        switch (action.type) {
            /**
             * LOGIN
             * */
            case types.LOGIN_SUCCESS:
            case types.GET_USER_SUCCESS:
                try {
                    const state: IState = store.getState();
                    Cookies.set('phoqer_auth', JSON.stringify({ ...state.auth, ...action.payload }));
                } catch (error) {
                    notifications('error');
                }
                next(action);
                break;

            /**
             * LOGOUT
             * */
            case types.LOGOUT_END:
                try {
                    Cookies.set('phoqer_auth', JSON.stringify(initState.auth));
                } catch (error) {
                    notifications('error');
                }
                next(action);
                break;

            /**
             * OFFER CREATION
             * */
            case types.NEW_OFFER_FORM:
            case types.POST_OFFER_SUCCESS:
                try {
                    const state: IState = store.getState();
                    localStorage.setItem('phoqer_new_offer', JSON.stringify({ ...state.offers.newOffer, ...action.payload }));
                } catch (error) {
                    notifications('error');
                }
                next(action);
                break;

            /**
             * HYDRATE ACTION
             * */
            case HYDRATE:
                try {
                    // Auth
                    const authStr: string | null = Cookies.get('phoqer_auth') || null;
                    const auth: IAuth = authStr ? JSON.parse(authStr) : initState.auth;

                    const newOfferStr: string | null = localStorage.getItem('phoqer_new_offer') || null;
                    const newOffer: INewOffer = newOfferStr ? JSON.parse(newOfferStr) : initState.offers.newOffer;

                    // next
                    next({
                        type: HYDRATE,
                        payload: {
                            ...action.payload,
                            auth,
                            offers: {
                                ...action.payload.offers,
                                newOffer: {
                                    ...action.payload.offers.newOffer,
                                    ...newOffer,
                                },
                            },
                        },
                    });
                } catch (error) {
                    notifications('error');
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
