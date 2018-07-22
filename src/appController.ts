import { APIGatewayEvent } from 'aws-lambda';

import { Film, FilmService } from './film';

export interface Response {
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

class AppController {
  private filmService: FilmService;

  constructor() {
    this.filmService = new FilmService();
  }

  async getFilm(event: APIGatewayEvent) {
    try {
      const title: string = this.extractTitle(event);
      this.validateTitle(title);

      const film: Film = await this.filmService.getFilm(title);
      this.validateFilm(film);

      const response = {
        statusCode: 200,
        body: JSON.stringify(film.toJson()),
      };

      return response;
    } catch (error) {
      return this.handleError(error, event);
    }
  }

  private extractTitle(event: APIGatewayEvent): string {
    if (!event.queryStringParameters || !event.queryStringParameters.title) {
      throw new Error(ResponseError.invalidTitle);
    }
    const { title } = event.queryStringParameters;

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

  private handleError(error: Error, event: APIGatewayEvent): Response {
    switch (error.message) {
      case ResponseError.invalidTitle:
        return errorResponses.invalidTitle;
      case ResponseError.notFound:
        return errorResponses.notFound;
      default:
        console.error('Unexpected error', event, error);
        return errorResponses.internalServerError;
    }
  }
}

export default new AppController();
