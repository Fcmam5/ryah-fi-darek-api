describe('logger configuration', () => {
  let mockedBunyan;
  let mockedLogger;

  beforeEach(() => {
    mockedBunyan = {
      createLogger: jest.fn(),
    };

    jest.mock('bunyan', () => mockedBunyan);

    mockedLogger = require('../../src/lib/logger');
  });

  it('should define a logger with a given name', () => {
    const name = 'a name';
    mockedLogger(name);
    expect(mockedBunyan.createLogger).toHaveBeenCalledWith({ name });
  });
});
