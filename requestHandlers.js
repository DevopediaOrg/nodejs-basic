const url = require('url');
const querystring = require('querystring');
const exec = require('child_process').exec;

function home(request, response) {
  const reqUrl = url.parse(request.url, true);

  // default to 'World' if no username is given
  let username;
  if (reqUrl.query.username === undefined) username = 'World';
  else username = reqUrl.query.username;

  const body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body><h1>'+`Hello ${username}`+'</h1><hr>'+
  '<form action="/upload" method="post" enctype="multipart/form-data">'+
  '<div><p>Name<br><input name="name" type="text"></div>'+
  '<div><p>Age<br><input name="age" type="text"></div>'+
  '<div><p>Sex<br>'+
  '<input name="sex" type="radio" value="Male" checked> Male<br>'+
  '<input name="sex" type="radio" value="Female"> Female<br>'+
  '</div>'+
  '<div><p>Profile picture<br><input type="file" name="upload" multiple="multiple"></div>'+
  '<div><p>Remarks<br><textarea name="remarks" rows="5" cols="60"></textarea></div>'+
  '<input type="submit" value="Submit" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

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

function upload(request, response, postData) {
  const pdata = querystring.parse(postData);
  response.writeHead(200, {'content-type': 'text/plain'});
  response.write('Your data:\n' + JSON.stringify(pdata, null, 4));
  response.end();
}

exports.home = home;
exports.list = list;
exports.upload = upload;
