import { Film, FilmService } from './film';

export interface AppRequest {
  body: string;
  queryStringParameters: { [param: string]: string };
}

export interface AppResponse {
  statusCode: number;
  body?: string;
}

enum ResponseError {
  invalidTitle = 'invalid title',
  notFound = 'not found',
}

const errorResponses = {
  invalidTitle: { statusCode: 400, body: JSON.stringify({ error: ResponseError.invalidTitle }) },
  notFound: { statusCode: 404, body: JSON.stringify({ error: ResponseError.notFound }) },
  internalServerError: { statusCode: 500, body: JSON.stringify({}) },
};

export default class AppController {
  constructor(private filmService: FilmService) { }

  async getFilm(request: AppRequest): Promise<AppResponse> {
    try {
      const title: string = this.extractTitle(request);
      this.validateTitle(title);

      const film: Film = await this.filmService.getFilm(title);
      this.validateFilm(film);

      const response = {
        statusCode: 200,
        body: JSON.stringify(film),
      };

      return response;
    } catch (error) {
      return this.handleError(error, request);
    }
  }

  private extractTitle(request: AppRequest): string {
    if (!request.queryStringParameters || !request.queryStringParameters.title) {
      throw new Error(ResponseError.invalidTitle);
    }
    const { title } = request.queryStringParameters;

    return title;
  }

  private validateTitle(title: string): void {
    if (typeof title !== 'string' || !title.length) {
      throw new Error(ResponseError.invalidTitle);
    }
  }

  private validateFilm(film: Film): void {
    if (!film) {
      throw new Error(ResponseError.notFound);
    }
  }

  private handleError(error: Error, request: AppRequest): AppResponse {
    switch (error.message) {
      case ResponseError.invalidTitle:
        return errorResponses.invalidTitle;
      case ResponseError.notFound:
        return errorResponses.notFound;
      default:
        console.error('Unexpected error', request, error);
        return errorResponses.internalServerError;
    }
  }
}
