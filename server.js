const http = require('http');
const util = require('util');
const fs = require('fs');
const formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 8888;

function start(route, handle) {
  function onRequest(request, response) {
    console.log(`Request received for URL ${request.url}`);

    if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
      // parse a file upload
      var form = new formidable.IncomingForm();
      form.parse(request, function(error, fields, files) {
        var oldpath = files.upload.path;
        var newpath = 'static/profiles/' + files.upload.name;
        fs.rename(oldpath, newpath, function () {
          response.writeHead(200, {'Content-Type': 'text/plain'});
          response.write('Your upload:\n');
          response.end(util.inspect({fields: fields, files: files}));
        });
      });
      return;
    }

    let postData = '';
    request.setEncoding('utf8');
    request.addListener('data', function(chunk) {
      postData += chunk;
    });
    request.addListener('end', function() {
      route(handle, request, response, postData);
    });
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
  });  
}

exports.start = start;