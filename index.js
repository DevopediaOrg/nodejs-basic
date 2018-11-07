const server = require('./lib/server');
const router = require('./controllers/router');
const requestHandlers = require('./models/requestHandlers');

// Map the callbacks
const handle = {};
handle['/'] = requestHandlers.home;
handle['/home'] = requestHandlers.home;
handle['/list'] = requestHandlers.list;
handle['/upload'] = requestHandlers.upload;

// Setup the default logger
require('./lib/logger'); 

// Start the server
server.start(router.route, handle);