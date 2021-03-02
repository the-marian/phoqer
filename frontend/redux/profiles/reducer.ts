import { combineReducers } from 'redux';

import publicProfile from './public/reducer';

export default combineReducers({ public: publicProfile });
