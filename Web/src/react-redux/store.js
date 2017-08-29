import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

export function configureStore(history, initialState) {

    // apply thunk (for async) and router middleware
    const middlewares = [thunk, routerMiddleware(history)];

    // if in dev enviroment also apply redux logger (logs to terminal)
    if (process.env.NODE_ENV === 'dev') {
        const createNodeLogger = require('redux-node-logger');
        middlewares.push(createNodeLogger());
    }

    const server = typeof (initialState) !== 'undefined' ? initialState.server : { env: '' };
    if (server.env === 'dev') {
        const { logger } = require(`redux-logger`);
        middlewares.push(logger);
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            ...middlewares
        )
    );

    return store;
}
