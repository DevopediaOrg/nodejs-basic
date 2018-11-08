const server = require('./lib/server');
const router = require('./controllers/router');
const {home} = require('./models/home');
const {list} = require('./models/list');
const {upload} = require('./models/upload');

const handle = {};
handle['/'] = home;
handle['/home'] = home;
handle['/list'] = list;
handle['/upload'] = upload;

server.start(router.route, handle);