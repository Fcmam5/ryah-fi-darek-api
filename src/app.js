const bodyParser = require('body-parser');
const helmet = require('helmet');

const {
  handle404,
  handelServerErrors,
  healthcheck,
} = require('./controllers/genericHandlers');

/**
 * Initialize expressjs application
 * @param {express.Application} expressApp Express.js instance
 */
const bootstrapApp = expressApp => {
  const app = expressApp();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(helmet());

  // Setup routes
  app.use('/health', healthcheck);

  // catch 404 and forward to error handler
  app.use(handle404);

  // error handler
  app.use(handelServerErrors);

  return app;
};

module.exports = bootstrapApp;
