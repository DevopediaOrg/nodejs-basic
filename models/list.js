const exec = require('child_process').exec;

function list(request, response) {
  exec('ls -lah', function (error, stdout) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(stdout);
    response.end();
  });
}

exports.list = list;
