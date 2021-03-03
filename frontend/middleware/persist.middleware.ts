import Cookies from 'js-cookie';
import { HYDRATE } from 'next-redux-wrapper';
import { Middleware } from 'redux';

import notifications from '../components/Common/Notifications';
import { IAuth, INewOffer, IState } from '../interfaces';
import initState from '../redux/state';
import types from '../redux/types';

const Persist: Middleware = store => next => action => {
    if (process.browser) {
        /**
         * REGULAR ACTIONS
         * */
        if (types.LOGIN_SUCCESS === action.type || types.GET_USER_SUCCESS === action.type) {
            try {
                const state: IState = store.getState();
                Cookies.set('phoqer_auth', JSON.stringify({ ...state.auth, ...action.payload }));
                next(action);
                return;
            } catch (error) {
                notifications('error');
                next(action);
                return;
            }
        }

        if (types.LOGOUT_SUCCESS === action.type || types.LOGOUT_ERROR === action.type) {
            try {
                Cookies.set('phoqer_auth', JSON.stringify(initState.auth));
                next(action);
                return;
            } catch (error) {
                notifications('error');
                next(action);
                return;
            }
        }

        if (types.NEW_OFFER_FORM === action.type || types.POST_OFFER_SUCCESS === action.type) {
            try {
                const state: IState = store.getState();
                localStorage.setItem('phoqer_new_offer', JSON.stringify({ ...state.offers.newOffer, ...action.payload }));
                next(action);
                return;
            } catch (error) {
                notifications('error');
                next(action);
                return;
            }
        }

        /**
         * HYDRATE ACTION
         * */
        if (HYDRATE === action.type) {
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
                return;
            } catch (error) {
                notifications('error');
                next(action);
                return;
            }
        }
    }

    next(action);
};

export default Persist;
