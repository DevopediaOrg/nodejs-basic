const url = require('url');

function route(handle, request) {
  const reqUrl = url.parse(request.url, true);

  if (typeof handle[reqUrl.pathname] === 'function') {
    return handle[reqUrl.pathname](request);
  }
  else {
    return '404';
  }
}

exports.route = route;
