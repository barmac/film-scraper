import { APIGatewayEvent } from 'aws-lambda';

import appController, { Response } from './appController';

export function getFilm(event: APIGatewayEvent): Promise<Response> {
  return appController.getFilm(event);
}
