const url = require('url');
const appUtils = require('../lib/utils');

function home(request, response) {
  const reqUrl = url.parse(request.url, true);
  appUtils.serveUserForm(response, 200, reqUrl.query.username);
}

exports.home = home;
