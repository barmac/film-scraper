import { APIGatewayEvent } from 'aws-lambda';

import AppController, { AppRequest, AppResponse } from './appController';
import { FilmService } from './film';

const appController = new AppController(new FilmService());

export function getFilm(event: APIGatewayEvent): Promise<AppResponse> {
  const request: AppRequest = { body: event.body, queryStringParameters: event.queryStringParameters };
  return appController.getFilm(request);
}
