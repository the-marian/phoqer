import { combineReducers } from 'redux';

import loading from './loading/reducer';
import publicProfile from './public/reducer';

export default combineReducers({ public: publicProfile, loading });
