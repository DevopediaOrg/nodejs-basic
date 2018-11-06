const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {};
handle['/'] = requestHandlers.home;
handle['/home'] = requestHandlers.home;
handle['/list'] = requestHandlers.list;

server.start(router.route, handle);