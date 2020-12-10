/* eslint-disable @typescript-eslint/no-var-requires */
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { IStore } from '../interfaces';
import rootReducer from './reducers';
import rootSaga from './sagas';

const bindMiddleware = (middleware: SagaMiddleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore = (): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store: IStore = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
