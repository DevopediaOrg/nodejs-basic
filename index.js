const server = require('./lib/server');
const router = require('./controllers/router');
const requestHandlers = require('./models/requestHandlers');

const handle = {};
handle['/'] = requestHandlers.home;
handle['/home'] = requestHandlers.home;
handle['/list'] = requestHandlers.list;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);