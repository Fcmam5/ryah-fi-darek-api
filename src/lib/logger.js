const bunyan = require('bunyan');

const logger = name => bunyan.createLogger({ name });

module.exports = logger;
