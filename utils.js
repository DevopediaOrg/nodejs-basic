function serveDefault(response, type, data) {
  response.writeHead(200, {'Content-Type': type});
  response.write(data);
  response.end();  
}

exports.serveDefault = serveDefault;