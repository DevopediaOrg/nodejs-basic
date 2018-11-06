const url = require('url');
const exec = require('child_process').exec;

// this is only to illustrate that Node is single-threaded
function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function home(request) {
  const reqUrl = url.parse(request.url, true);

  // default to 'World' if no username is given
  let username;
  if (reqUrl.query.username === undefined) username = 'World';
  else username = reqUrl.query.username;

  return `Hello ${username}`;
}

function list() {
  let content = 'empty';

  msleep(10000);

  exec('ls -lah', function (error, stdout) {
    content = stdout;
  });

  return content; // will this return the expected listing?
}

exports.home = home;
exports.list = list;
