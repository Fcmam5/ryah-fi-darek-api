describe('tips routes', () => {
  let mockRouter;
  let controller;

  beforeEach(() => {
    mockRouter = {
      post: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    jest.mock('express', () => ({ Router: () => mockRouter }));

    controller = require('../../src/controllers/tipsController');

    require('../../src/routes/tipsRoutes');
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should register get /tips route', () => {
    expect(mockRouter.get).toHaveBeenCalledWith('/', controller.getTipsList);
  });
});
