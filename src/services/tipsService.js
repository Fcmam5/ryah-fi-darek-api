const config = require('config');
const data = require('../../data/data.json');

const CATEGORIES = config.get('contentDefaults.CATEGORIES');

const _hasLangage = (lang = 'any') => ({ language }) =>
  language === 'any' || language === lang;

const _hasType = (givenType) => ({ type }) =>
  type ? type === givenType : true;

/**
 * Get a content
 *
 * @param {String} language Content language (default to "any")
 * @param {String} type Content type
 * @returns {Object}
 */
const getTipsList = (language, type) => {
  if (language || type) {
    const _filterByLanguage = _hasLangage(language);
    const _filterByType = _hasType(type);

    return CATEGORIES.reduce((acc, category) => {
      // eslint-disable-next-line security/detect-object-injection
      const _data = data[category].filter(
        (elm) => _filterByLanguage(elm) && _filterByType(elm)
      );
      return { ...acc, [category]: _data };
    }, {});
  }

  return data;
};

module.exports = {
  getTipsList,
};
