const handlers = require('../../src/controllers/genericHandlers');

describe('controllers/genericHandlers', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('error handlers', () => {
    it('handle 404 errors', () => {
      handlers.handle404({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: 404,
        message: 'Page not found',
      });
    });

    it('handle unhandler errors', () => {
      const error = {
        statusCode: 500,
        message: 'You shall not pass',
      };

      handlers.handelServerErrors(error, {}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: error.statusCode,
        message: error.message,
      });
    });

    it('handle unhandler Boom errors', () => {
      const boom = require('@hapi/boom');
      const errorText = 'Some internal error';
      const internalError = boom.badImplementation(errorText);

      handlers.handelServerErrors(internalError, {}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(
        internalError.output.statusCode
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'error',
        statusCode: internalError.output.statusCode,
        message: errorText,
      });
    });
  });

  it('should healthcheck', () => {
    handlers.healthcheck({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
