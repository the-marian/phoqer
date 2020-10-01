import { combineReducers } from 'redux';

import categories from './categories/reducer';
import modal from './modal/reducer';

export default combineReducers({ modal, categories });
