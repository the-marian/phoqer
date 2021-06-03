import { combineReducers } from 'redux';

import chats from './chats/reducer';
import messages from './messages/reducer';

const chat = combineReducers({ chats, messages });

export default chat;
