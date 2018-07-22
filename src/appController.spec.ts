import AppController, { AppRequest, AppResponse } from './appController';
import { Film, FilmService } from './film';
jest.mock('./film');

const mockFilm: Film = {
  title: 'mockTitle',
  averageRating: 1,
};

describe('AppController', () => {
  beforeEach(() => {
    jest.mock('./film');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return BAD REQUEST for missing title param', async () => {
    const mockRequest: AppRequest = {
      body: '',
      queryStringParameters: {},
    };

    const appController = new AppController(new FilmService());
    const response: AppResponse = await appController.getFilm(mockRequest);

    expect(response.statusCode).toBe(400);
  });

  it('should return NOT FOUND if film does not exist', async () => {
    const mockRequest: AppRequest = {
      body: '',
      queryStringParameters: {
        'title': 'notExistingFilm',
      },
    };

    const appController = new AppController(new FilmService());
    const response: AppResponse = await appController.getFilm(mockRequest);

    expect(response.statusCode).toBe(404);
  });

  it('should return film if it was returned by FilmService', async () => {
    FilmService.prototype.getFilm = jest.fn().mockResolvedValueOnce(mockFilm);

    const mockRequest: AppRequest = {
      body: '',
      queryStringParameters: {
        'title': 'notExistingFilm',
      },
    };

    const appController = new AppController(new FilmService());
    const response: AppResponse = await appController.getFilm(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(mockFilm));
  });
});
