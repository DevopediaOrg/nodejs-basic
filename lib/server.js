const http = require('http');
const logger = require('./logger');

const hostname = '127.0.0.1';
const port = 8888;

function start(route, handle) {
  function onRequest(request, response) {
    logger.info(`Request received for URL ${request.url}`);
    route(handle, request, response);
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    logger.info(`Server running at http://${hostname}:${port}/`);
  });  
}

exports.start = start;