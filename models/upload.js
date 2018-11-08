const url = require('url');
const util = require('util');
const fs = require('fs');
const formidable = require('formidable');
const validator = require('node-input-validator');
const logger = require('../lib/logger');
const appUtils = require('../lib/utils');

function upload(request, response) {
  // parse a file upload
  const form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    if (error) {
      logger.error(error.message);
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
        appUtils.serveUserForm(response, 422, reqUrl.query.username, errors);
        return;
      }

      // rename and save in static folder
      // file upload is optional
      if (files.upload.name) {
        var oldpath = files.upload.path;
        var newpath = 'statixc/profiles/' + files.upload.name;
        fs.rename(oldpath, newpath, function (error) {
          if (error) logger.error(error.message);
        });  
      }

      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write('Your upload:\n');
      response.end(util.inspect({fields: fields, files: files}));
    });
  });
}

exports.upload = upload;

