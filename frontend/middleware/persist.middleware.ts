import Cookies from 'js-cookie';
import { HYDRATE } from 'next-redux-wrapper';
import { Middleware } from 'redux';

import notifications from '../components/Common/Notifications';
import { IAuth, INewOffer } from '../interfaces';
import initState from '../redux/state';
import types from '../redux/types';

const Persist: Middleware = () => next => action => {
    // console.dir(action);

    if (process.browser) {
        /**
         * SET DATA TO STORAGE
         * */
        if (types.LOGIN_SUCCESS === action.type) {
            try {
                Cookies.set('auth', JSON.stringify(action.payload));
            } catch (error) {
                notifications('error');
                return next(action);
            }
        }

        if (types.LOGOUT_SUCCESS === action.type) {
            try {
                Cookies.set('auth', JSON.stringify(action.payload));
            } catch (error) {
                notifications('error');
                return next(action);
            }
        }

        if (types.NEW_OFFER_FORM === action.type) {
            try {
                localStorage.setItem('new_offer', JSON.stringify(action.payload));
            } catch (error) {
                notifications('error');
                return next(action);
            }
        }

        /**
         * DISPATCH ACTIONS
         * */
        if (HYDRATE === action.type) {
            try {
                const auth: IAuth = JSON.parse(Cookies.get('auth')) || initState.auth;
                const newOffer: INewOffer = JSON.parse(localStorage.getItem('new_offer')) || initState.newOffer;

                return next({
                    type: HYDRATE,
                    payload: {
                        ...action.payload,
                        auth,
                        newOffer: {
                            ...action.payload.newOffer,
                            ...newOffer,
                        },
                    },
                });
            } catch (error) {
                notifications('error');
                return next(action);
            }
        }
    }
    // Do stuff
    return next(action);
};

export default Persist;
