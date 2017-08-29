import 'babel-polyfill';

import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from './store';
import getRoutes from './routes';

const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store);

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router onUpdate={() => window.scrollTo(0, 0)} {...renderProps} />
        </Provider>,
        document.getElementById('root')
    );
});
