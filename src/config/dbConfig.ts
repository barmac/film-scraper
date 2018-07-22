import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

AWS.config.update({
  region: process.env.AWS_REGION,
});

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'local') {
  AWS.config.update({
    endpoint: 'http://localhost:8000',
  }, true);
}

export const dbClient = new DocumentClient();
export const tableName = 'filmsTable';
