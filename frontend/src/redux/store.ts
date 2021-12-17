import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { IState, IStore } from '../interfaces';

import rootReducer from './reducers';
import rootSaga from './sagas';
import initState from './state';

const bindMiddleware = (middleware: (SagaMiddleware | Middleware)[]) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore = (preloadedState = initState): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store: IStore = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

// eslint-disable-next-line
export type AppStore = Store<IState, any>;

export const wrapper = createWrapper(makeStore as MakeStore<AppStore>, { debug: false });
