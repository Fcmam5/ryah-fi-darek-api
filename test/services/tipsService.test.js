/* eslint-disable sonarjs/no-duplicate-string */
describe('tips service', () => {
  let service;
  let mockData;
  beforeEach(() => {
    mockData = {
      kids: [],
      sport: [
        {
          title: 'some video',
          link: 'https://www.youtube.com/',
          type: 'video',
          language: 'en',
        },
        {
          title: 'some article',
          link: 'https://www.google.dz/',
          type: 'article',
        },
      ],
      education: [],
      art: [],
      languages: [
        {
          title: 'english app',
          link: 'https://www.github.com/',
          type: 'mobileApp',
          language: 'en',
        },
        {
          title: 'french app',
          link: 'https://www.github.fr/',
          type: 'mobileApp',
          language: 'fr',
        },
      ],
      other: [],
    };

    jest.mock('../../data/data.json', () => mockData);

    service = require('../../src/services/tipsService');
  });

  it('should return the full list', () => {
    expect(service.getTipsList()).toMatchObject(mockData);
  });

  it('should filter content by language', () => {
    expect(service.getTipsList('en')).toMatchObject({
      kids: [],
      sport: [
        {
          title: 'some video',
          link: 'https://www.youtube.com/',
          type: 'video',
          language: 'en',
        },
        {
          title: 'some article',
          link: 'https://www.google.dz/',
          type: 'article',
        },
      ],
      education: [],
      art: [],
      languages: [
        {
          title: 'english app',
          link: 'https://www.github.com/',
          type: 'mobileApp',
          language: 'en',
        },
      ],
      other: [],
    });
  });

  it('should filter content by type', () => {
    expect(service.getTipsList(undefined, 'mobileApp')).toMatchObject({
      kids: [],
      sport: [],
      education: [],
      art: [],
      languages: [
        {
          title: 'english app',
          link: 'https://www.github.com/',
          type: 'mobileApp',
          language: 'en',
        },
        {
          title: 'french app',
          link: 'https://www.github.fr/',
          type: 'mobileApp',
          language: 'fr',
        },
      ],
      other: [],
    });
  });

  it('should filter content by language and type', () => {
    expect(service.getTipsList('en', 'mobileApp')).toMatchObject({
      kids: [],
      sport: [],
      education: [],
      art: [],
      languages: [
        {
          title: 'english app',
          link: 'https://www.github.com/',
          type: 'mobileApp',
          language: 'en',
        },
      ],
      other: [],
    });
  });
});

/*
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
*/
