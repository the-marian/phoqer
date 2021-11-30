import { combineReducers } from 'redux';

import chats from './chats/reducer';
import info from './info/reducer';
import item from './item/reducer';
import messages from './messages/reducer';

const chat = combineReducers({ chats, messages, info, item });

export default chat;
