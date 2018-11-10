const url = require('url');
const util = require('util');
const fs = require('fs');
const formidable = require('formidable');
const validator = require('node-input-validator');
const exec = require('child_process').exec;

function getFormBody(greeting='World', errors=null) {
  if (errors === null || errors === undefined) errors = [];

  let body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body><h1>'+`Hello ${greeting}`+'</h1><hr>';

  if (errors.length) {
    body += '<div><em>'+errors.join('<br>')+'</em></div><hr>';
  }

  body += '<form action="/upload" method="post" enctype="multipart/form-data">'+
  '<div><p>Name<br><input name="name" type="text"></div>'+
  '<div><p>Email<br><input name="email" type="text"></div>'+
  '<div><p>Password<br><input name="password" type="password"></div>'+
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

  return body;
}

function home(request, response) {
  const reqUrl = url.parse(request.url, true);

  const body = getFormBody(reqUrl.query.username);

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

function upload(request, response) {
  // parse a file upload
  const form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    if (error) {
      console.log(error.message);
      return;
    }

    let v = new validator(fields, {
      name: 'required|maxLength:50',
      email: 'required|email',
      password: 'required|minLength:8',
      age: 'required|integer|min:0'
    });

    v.check().then(function(matched) {
      if (!matched) {
        const errors = [];
        Object.keys(v.errors).forEach((key) => {
          errors.push(v.errors[key].message);
        });

        const reqUrl = url.parse(request.url, true);
        const body = getFormBody(reqUrl.query.username, errors);

        response.writeHead(422, {'Content-Type': 'text/html'});
        response.write(body);
        response.end();
        return;
      }

      // rename and save in static folder
      // file upload is optional
      if (files.upload.name) {
        const oldpath = files.upload.path;
        const newpath = 'static/profiles/' + files.upload.name;
        fs.rename(oldpath, newpath, function (error) {
          if (error) console.log(error.message);
        });  
      }

      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write('Your upload:\n');
      response.end(util.inspect({fields: fields, files: files}));
    });
  });
}

exports.home = home;
exports.list = list;
exports.upload = upload;
