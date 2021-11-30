import authTypes from './auth/types';
import categoriesTypes from './categories/types';
import chatTypes from './chat/types';
import commentsTypes from './comments/types';
import generalTypes from './config/types';
import notificationsTypes from './notifications/types';
import offersTypes from './offers/types';
import popularSearchesTypes from './popular-searches/types';
import profileTypes from './profiles/types';
import regionTypes from './region/types';

const types = {
    ...authTypes,
    ...chatTypes,
    ...generalTypes,
    ...categoriesTypes,
    ...offersTypes,
    ...commentsTypes,
    ...profileTypes,
    ...regionTypes,
    ...notificationsTypes,
    ...popularSearchesTypes,
};

export default types;
