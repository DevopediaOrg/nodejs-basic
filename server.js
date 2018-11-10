const http = require('http');

const hostname = 'localhost';
const port = 8888;

function start(route, handle) {
  function onRequest(request, response) {
    console.log(`Request received for URL ${request.url}`);

    const content = route(handle, request);

    let statusCode = 200;
    if (content === '404') statusCode = 404;
    response.writeHead(statusCode, {'Content-Type': 'text/plain'});
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
  });  
}

exports.start = start;