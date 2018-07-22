import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { Film, FilmService } from './film';

const errors = {
  invalidTitle: 'invalid title',
  notFound: 'not found',
};

class AppController {
  private filmService: FilmService;

  constructor() {
    this.filmService = new FilmService();
  }

  getFilm: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {
      const title: string = this.extractTitle(event);
      this.validateTitle(title);

      const film: Film = await this.filmService.getFilm(title);
      this.validateFilm(film);

      const response = {
        statusCode: 200,
        body: JSON.stringify(film.toJson()),
      };

      cb(null, response);
    } catch (error) {
      this.handleError(error, event, cb);
    }
  }

  private extractTitle(event: APIGatewayEvent): string {
    if (!event.queryStringParameters || !event.queryStringParameters.title) {
      throw new Error(errors.invalidTitle);
    }
    const { title } = event.queryStringParameters;

    return title;
  }

  private validateTitle(title: string): void {
    if (typeof title !== 'string' || !title.length) {
      throw new Error(errors.invalidTitle);
    }
  }

  private validateFilm(film: Film): void {
    if (!film) {
      throw new Error(errors.notFound);
    }
  }

  private handleError(error: Error, event: APIGatewayEvent, cb: Callback): void {
    switch (error.message) {
      case errors.invalidTitle:
        cb(null, { statusCode: 400, body: JSON.stringify({ error: errors.invalidTitle }) });
        break;
      case errors.notFound:
        cb(null, { statusCode: 404, body: JSON.stringify({ error: errors.notFound }) });
        break;
      default:
        console.error('Unexpected error', event, error);
        cb(null, { statusCode: 500, body: JSON.stringify({}) });
    }
  }
}

export default new AppController();