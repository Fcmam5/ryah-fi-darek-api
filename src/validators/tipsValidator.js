const joi = require('@hapi/joi');
const config = require('config');

// Define data schema
// const CATEGORIES = config.get('contentDefaults.CATEGORIES');
const SUPPORTED_LANGUAGES = config.get('contentDefaults.SUPPORTED_LANGUAGES');
const SUPPORTED_TYPES = config.get('contentDefaults.SUPPORTED_TYPES');

const getListSchema = joi.object({
  lang: joi.string().valid(...SUPPORTED_LANGUAGES),
  type: joi.string().valid(...SUPPORTED_TYPES),
});

const validateGetListRequest = (data) =>
  getListSchema.validate(data, { stripUnknown: true });

module.exports = {
  validateGetListRequest,
};
// module.exports;
