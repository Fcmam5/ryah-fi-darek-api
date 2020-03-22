describe('express application', () => {
  let mockedExpress;
  let mockedHelmet;
  let mockedBodyParser;

  beforeEach(() => {
    mockedExpress = {
      use: jest.fn(),
    };

    mockedBodyParser = {
      json: jest.fn(),
      urlencoded: jest.fn(),
    };

    jest.mock('helmet');
    mockedHelmet = require('helmet');

    jest.mock('body-parser', () => mockedBodyParser);

    require('../src/app')(() => mockedExpress);
  });

  it('should use body-parser', () => {
    expect(mockedExpress.use).toHaveBeenCalledWith(mockedBodyParser.json());
    expect(mockedExpress.use).toHaveBeenCalledWith(
      mockedBodyParser.urlencoded()
    );
    expect(mockedBodyParser.urlencoded).toHaveBeenCalledWith({
      extended: true,
    });
  });

  it('should use helmet', () => {
    expect(mockedExpress.use).toHaveBeenCalledWith(mockedHelmet());
  });

  // TODO: Test route registration and middlewares order
});
