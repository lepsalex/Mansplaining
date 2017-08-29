// React server-side rendering
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import { configureStore } from './store';
import getRoutes from './routes';
import { links } from './links';


// Initial content to populate in page
const HTML = ({ content, store, helmet }) => {

    const state = store.getState();
    const { title } = state.pageMeta;

    return <html>
        <head>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="MobileOptimized" content="320" />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

            <link rel="icon" href="/public/favicon.ico" type="image/x-icon" />
            <link rel="stylesheet" type="text/css" href="/public/style.css" />

            {helmet.title.toComponent()}
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
            <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
            <script src="/public/bundle.js" />
        </body>
    </html>
};


// server-side react rendering (server.js)
const renderApp = (req, res, history, routes, store) => {
    return match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const content = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            )
            const helmet = Helmet.renderStatic();
            res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store} helmet={helmet} />))
        }
    });
}


// Builds store, checks for certain conditions, then renders the app
export default function reactRedux(req, res) {

    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    const routes = getRoutes(store);

    return renderApp(req, res, history, routes, store);
}
