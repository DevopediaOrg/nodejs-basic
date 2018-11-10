const http = require('http');

const hostname = 'localhost';
const port = 8888;

http.createServer(function(request, response) {
  console.log(`Request received for URL ${request.url}`);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World');
  response.end();
}).listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});
