const exec = require('child_process').exec;

function list(request, response) {
  let cmd;
  if (process.platform === 'win32') cmd = 'dir';
  else cmd = 'ls -lah';
  exec(cmd, function (error, stdout) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(stdout);
    response.end();
  });
}

exports.list = list;
