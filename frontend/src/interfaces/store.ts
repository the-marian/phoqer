import { AnyAction, Store } from 'redux';

import { IAuth } from './auth';
import { ICategories } from './categories';
import { IStateConfig } from './config';
import { NotificationsState } from './notifications';
import { IOffers } from './offers';
import { IPublicProfile, IStateProfile } from './public-profile';
import { IRegion } from './region';

import { IStateChats, IStateComments, PopularSearches } from './index';

export interface IState {
    auth: IAuth;
    user: IPublicProfile;
    region: IRegion;
    config: IStateConfig;
    categories: ICategories[];
    offers: IOffers;
    comments: IStateComments;
    profiles: IStateProfile;
    chat: IStateChats;
    notifications: NotificationsState;
    popularSearches: PopularSearches;
}

export interface IStore extends Store<IState, AnyAction> {
    sagaTask?: { toPromise: () => void };
}
