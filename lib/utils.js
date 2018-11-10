const fs = require('fs');
const handlebars = require('handlebars');

function serveDefault(response, type, data) {
  response.writeHead(200, {'Content-Type': type});
  response.write(data);
  response.end();  
}

function serveUserForm(response, type, greeting='World', errors=null) {
  if (errors === null || errors === undefined) errors = [];

  const data = {
    greeting: greeting, 
    errors: errors
  };

  fs.readFile('views/form.htm', 'utf-8', function(error, source) {
    handlebars.registerHelper('toUpperCase', function(str) {
      return str.toUpperCase();
    });

    const template = handlebars.compile(source);
    response.writeHead(type, {'Content-Type': 'text/html'});
    response.write(template(data));
    response.end();
  });
}


exports.serveDefault = serveDefault;
exports.serveUserForm = serveUserForm;