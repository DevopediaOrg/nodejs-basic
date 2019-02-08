const exec = require('child_process').exec;
const appUtils = require('../lib/utils');

function list(request, response) {
  let cmd;
  if (process.platform === 'win32') cmd = 'dir';
  else cmd = 'ls -lah';
  exec(cmd, function (error, stdout) {
    appUtils.serveDefault(response, 'text/plain', stdout);
  });
}

exports.list = list;
