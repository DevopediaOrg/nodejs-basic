const {transports, createLogger, format} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: './app.log'})
  ]
});

module.exports = logger;
