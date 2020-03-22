/* eslint-disable no-console */
const config = require('config');
const Joi = require('@hapi/joi');
const data = require('./data.json');

// Define data schema
const CATEGORIES = config.get('contentDefaults.CATEGORIES');
const SUPPORTED_LANGUAGES = config.get('contentDefaults.SUPPORTED_LANGUAGES');
const SUPPORTED_TYPES = config.get('contentDefaults.SUPPORTED_TYPES');

const defsSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().min(3).trim(),
    link: Joi.string().uri().trim().allow(''),
    type: Joi.string().valid(...SUPPORTED_TYPES),
    language: Joi.string()
      .valid(...SUPPORTED_LANGUAGES)
      .default('any'),
  })
);

const _constructedSchema = CATEGORIES.reduce(
  (acc, cat) => ({ ...acc, [cat]: defsSchema }),
  {}
);

const schema = Joi.object(_constructedSchema);

// Validate data
(async function validateData() {
  try {
    await schema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    console.warn('Invalid data object');
    console.error(error);
  }
})();
