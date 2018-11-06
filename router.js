const url = require('url');

function route(handle, request, response) {
  const reqUrl = url.parse(request.url, true);

  if (typeof handle[reqUrl.pathname] === 'function') {
    handle[reqUrl.pathname](request, response);
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found');
    response.end();
  }
}

exports.route = route;
