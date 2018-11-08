const server = require('./lib/server');
const router = require('./controllers/router');
const {home} = require('./models/home');
const {list} = require('./models/list');
const {upload} = require('./models/upload');

// Map the callbacks
const handle = {};
handle['/'] = home;
handle['/home'] = home;
handle['/list'] = list;
handle['/upload'] = upload;

// Setup the default logger
require('./lib/logger'); 

// Start the server
server.start(router.route, handle);