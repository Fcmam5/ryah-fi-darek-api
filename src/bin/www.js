#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http = require('http');
const express = require('express');
const config = require('config');
const logger = require('../lib/logger')(__filename);
const app = require('../app')(express);

const port = config.get('server.port') || 3000;

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onHttpServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onHttpListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.debug(`🚀 Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onHttpServerError);
server.on('listening', onHttpListening);

/**
 * Graceful shutdown
 */
const onSignal = (eventType, exitCode = 1) => {
  return [
    eventType,
    () => {
      logger.warn(`Received ${eventType} signal, starting cleanup`);
      process.exit(exitCode);
    },
  ];
};

process.on(...onSignal('uncaughtException'));
process.on(...onSignal('SIGINT', 15));
process.on(...onSignal('SIGTERM', 130));
process.on(...onSignal('exit', 1));

// Start server
server.listen(port);

module.exports = server;
