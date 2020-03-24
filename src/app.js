const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressPresenter = require('express-presenter')('v1');

const genericHandlers = require('./controllers/genericHandlers');
const tipsRoutes = require('./routes/tipsRoutes');

/**
 * Initialize expressjs application
 * @param {express.Application} expressApp Express.js instance
 */
const bootstrapApp = (expressApp) => {
  const app = expressApp();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(helmet());
  app.use(expressPresenter);

  // Setup routes
  app.use('/health', genericHandlers.healthcheck);
  app.use('/tips', tipsRoutes);

  // catch 404 and forward to error handler
  app.use(genericHandlers.handle404);

  // error handler
  app.use(genericHandlers.handelServerErrors);

  return app;
};

module.exports = bootstrapApp;
