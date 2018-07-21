import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { Film, FilmService } from './film';

const filmService = new FilmService();

const errors = {
  invalidTitle: 'invalid title',
  notFound: 'not found',
};

export const getFilm: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  try {
    const title: string = extractTitle(event);
    validateTitle(title);

    const film: Film = await filmService.getFilm(title);
    validateFilm(film);

    const response = {
      statusCode: 200,
      body: JSON.stringify(film.toJson()),
    };

    cb(null, response);
  } catch (error) {
    handleError(error, event, cb);
  }
};

function extractTitle(event: APIGatewayEvent): string {
  if (!event.queryStringParameters || !event.queryStringParameters.title) {
    throw new Error(errors.invalidTitle);
  }
  const { title } = event.queryStringParameters;

  return title;
}

function validateTitle(title: string): void {
  if (typeof title !== 'string' || !title.length) {
    throw new Error(errors.invalidTitle);
  }
}

function validateFilm(film: Film) {
  if (!film) {
    throw new Error(errors.notFound);
  }
}

function handleError(error: Error, event: APIGatewayEvent, cb: Callback): void {
  switch (error.message) {
    case errors.invalidTitle:
      cb(null, { statusCode: 400, body: JSON.stringify({ error: errors.invalidTitle }) });
      break;
    case errors.notFound:
      cb(null, { statusCode: 404, body: JSON.stringify({ error: errors.notFound }) });
    default:
      console.error('Unexpected error', event, error);
      cb(null, { statusCode: 500, body: JSON.stringify({}) });
  }
}
