const fs = require('fs');
const mime = require('mime-types');
const appUtils = require('./utils');

const StaticPath = 'static';

function staticFileExists(urlPath) {
  urlPath = urlPath.replace(/^\//, '');
  return fs.existsSync(`${StaticPath}/${urlPath}`);
}

function serveStaticFile(urlPath, response) {
  let staticPath;

  urlPath = urlPath.replace(/^\//, '');
  if (urlPath === 'favicon.ico') staticPath = `${StaticPath}/images/favicon.ico`;
  else staticPath = `${StaticPath}/${urlPath}`;

  console.log(`Serving static file ${staticPath}`);
  fs.readFile(staticPath, function(err, data) {
    if(err) serveStaticFile('html/404.htm', response);
    else appUtils.serveDefault(response, mime.lookup(staticPath), data);
  });
}

exports.staticFileExists = staticFileExists;
exports.serveStaticFile = serveStaticFile;