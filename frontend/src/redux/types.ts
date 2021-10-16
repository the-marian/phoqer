import authTypes from './auth/types';
import categoriesTypes from './categories/types';
import chatTypes from './chat/types';
import commentsTypes from './comments/types';
import generalTypes from './config/types';
import offersTypes from './offers/types';
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
};

export default types;
