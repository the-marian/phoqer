import { all, fork } from 'redux-saga/effects';

import chats from './chats/saga';
import info from './info/saga';
import messages from './messages/saga';

export default function* chat(): Generator {
    yield all([fork(chats), fork(messages), fork(info)]);
}
