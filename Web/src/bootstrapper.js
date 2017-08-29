// env + config
const { env, port } = require('./config');

// Express setup
const express = require('express');
const bodyParser = require('body-parser');

// Import middleware
const { requestLogger } = require('../middleware/logger');

// Express init
const app = express();

if (env === "dev") {
    // Webpack Live Reload
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.dev');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));

    // Log rejected promise reason
    process.on('unhandledRejection', (reason) => {
        console.log('Reason: ' + reason);
    });
}

// apply logger middleware
app.use(requestLogger());

// static assets serve
app.use('/public', express.static('public'));

// if in production include webpack compiled bundle
if (env === "production") {
    app.use('/public', express.static('dist/public'));
}

module.exports = { app };
