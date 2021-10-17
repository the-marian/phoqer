import { IState } from '../interfaces';

import authInit from './auth/init-state';
import categoriesInit from './categories/init-state';
import chatInit from './chat/init-state';
import commentsInit from './comments/init-state';
import configInit from './config/init-state';
import notificationsInit from './notifications/init-state';
import offersInit from './offers/init-state';
import profilesInit from './profiles/init-state';
import regionInit from './region/init-state';
import userInit from './user/init-state';

const initState: IState = {
    auth: authInit,
    user: userInit,
    region: regionInit,
    config: configInit,
    categories: categoriesInit,
    profiles: profilesInit,
    comments: commentsInit,
    offers: offersInit,
    chat: chatInit,
    notifications: notificationsInit,
};

export default initState;
