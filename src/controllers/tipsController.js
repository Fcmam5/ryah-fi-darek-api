const boom = require('@hapi/boom');
const { validateGetListRequest } = require('../validators/tipsValidator');
const service = require('../services/tipsService');

const getTipsList = (req, res, next) => {
  const { error } = validateGetListRequest();
  const { lang, type } = req.query;

  if (error) {
    return next(boom.badRequest());
  }

  const data = service.getTipsList(lang, type);

  return res.ok({ data });
};

module.exports = { getTipsList };
