const boom = require('@hapi/boom');

describe('controllers/tipsController', () => {
  let mockResponsePresenter;
  let mockedService;
  let mockNextCallback;
  let controller;

  beforeEach(() => {
    mockNextCallback = jest.fn();
    mockResponsePresenter = {
      ok: jest.fn(),
    };

    mockedService = {
      getTipsList: jest.fn(),
    };
    jest.mock('../../src/services/tipsService', () => mockedService);

    controller = require('../../src/controllers/tipsController');
  });

  it('should return data successfully', () => {
    const req = { query: {} };

    mockedService.getTipsList.mockReturnValue({});

    controller.getTipsList(req, mockResponsePresenter);

    expect(mockResponsePresenter.ok).toHaveBeenCalledWith({ data: {} });
  });

  it('should return boom badRequest if the query parameters are invalid', () => {
    const req = {
      query: {
        lang: 0,
      },
    };

    mockedService.getTipsList.mockReturnValue({});

    controller.getTipsList(req, mockResponsePresenter, mockNextCallback);

    expect(mockNextCallback).toHaveBeenCalledWith(boom.badRequest());
  });
});
