import { combineReducers } from 'redux';

import chats from './chats/reducer';
import info from './info/reducer';
import messages from './messages/reducer';

const chat = combineReducers({ chats, messages, info });

export default chat;
