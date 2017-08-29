const fs = require('fs')

// get app
const { app } = require('./bootstrapper');
const { port } = require('./config');

// register api routes
const Router = require('./api/router');
app.use('/api/v1', Router);

// react server side rendering
import reactRedux from './react-redux/server';
app.use(reactRedux);

// START THE SERVER
// =============================================================================
app.listen(port);