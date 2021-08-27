import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { IState, IStore } from '../interfaces';

import Persist from './middleware/persist.middleware';
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
    const store: IStore = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware, Persist]));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(makeStore as MakeStore<IState, AnyAction>, { debug: false });
