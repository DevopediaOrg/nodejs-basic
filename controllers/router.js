const url = require('url');
const appStatic = require('../lib/static');

function route(handle, request, response) {
  const reqUrl = url.parse(request.url, true);

  if (typeof handle[reqUrl.pathname] === 'function') {
    handle[reqUrl.pathname](request, response);
  }
  else if (reqUrl.pathname === '/favicon.ico' || 
           appStatic.staticFileExists(reqUrl.pathname)) {
    appStatic.serveStaticFile(reqUrl.pathname, response);
  }
  else {
    appStatic.serveStaticFile('html/404.htm', response);
  }
}

exports.route = route;
