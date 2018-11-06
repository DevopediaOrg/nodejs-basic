const url = require('url');
const exec = require('child_process').exec;

function home(request, response) {
  const reqUrl = url.parse(request.url, true);

  // default to 'World' if no username is given
  let username;
  if (reqUrl.query.username === undefined) username = 'World';
  else username = reqUrl.query.username;

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(`Hello ${username}`);
  response.end();
}

function list(request, response) {
  exec('ls -lah', function (error, stdout) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(stdout);
    response.end();
  });
}

exports.home = home;
exports.list = list;
