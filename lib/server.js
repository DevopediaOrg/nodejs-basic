const http = require('http');

const hostname = '127.0.0.1';
const port = 8888;

function start(route, handle) {
  function onRequest(request, response) {
    console.log(`Request received for URL ${request.url}`);
    route(handle, request, response);
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
  });  
}

exports.start = start;