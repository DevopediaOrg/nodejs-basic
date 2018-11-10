const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 8888;

function start() {
  function onRequest(request, response) {
    console.log(`Request received for URL ${request.url}`);

    const reqUrl = url.parse(request.url, true);

    // not good to simply return without a response
    // we'll correct this later
    if (reqUrl.pathname == '/favicon.ico') return;

    // default to 'World' if no username is given
    let username;
    if (reqUrl.query.username === undefined) username = 'World';
    else username = reqUrl.query.username;

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(`Hello ${username}`);
    response.end();
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
  });  
}

exports.start = start;