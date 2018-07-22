import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import appController from './appController';

export function getFilm(event: APIGatewayEvent, context: Context, callback: Callback) {
  return appController.getFilm(event, context, callback);
}
