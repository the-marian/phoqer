import Cookies from 'js-cookie';
import { HYDRATE } from 'next-redux-wrapper';
import { Middleware } from 'redux';

import notifications from '../components/Common/Notifications';
import types from '../redux/types';

const Persist: Middleware = store => next => action => {
    // console.dir(action);

    if (process.browser) {
        /**
         * SET DATA TO STORAGE
         * */
        if (types.LOGIN_SUCCESS === action.type) {
            try {
                Cookies.set('auth', JSON.stringify(action.payload));
            } catch (error) {
                notifications('error', 'Oops, Something went wrong. Please, reload your browser and try again');
                next(action);
            }
        }

        if (types.LOGOUT_SUCCESS === action.type) {
            try {
                Cookies.set('auth', JSON.stringify(action.payload));
            } catch (error) {
                notifications('error', 'Oops, Something went wrong. Please, reload your browser and try again');
                next(action);
            }
        }

        /**
         * DISPATCH ACTIONS
         * */
        if (HYDRATE === action.type) {
            try {
                const payload = JSON.parse(Cookies.get('auth'));
                store.dispatch({ type: types.LOGIN_SUCCESS, payload });
            } catch (error) {
                notifications('error', 'Oops, Something went wrong. Please, reload your browser and try again');
                next(action);
            }
        }
    }
    // Do stuff
    return next(action);
};

export default Persist;
