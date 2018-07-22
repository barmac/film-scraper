import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Film } from './film';
import { dbClient, tableName } from '../config';

export class FilmDao {
  private client: DocumentClient;

  constructor() {
    this.client = dbClient;
  }

  async getFilmByTitle(title: string): Promise<Film> {
    const query = this.getQueryParams(title);
    const { Item: item }: DocumentClient.GetItemOutput = await this.client.get(query).promise();
    if (!item) {
      return;
    }

    return this.extractFilm(item);
  }

  async saveFilm(film: Film): Promise<Film> {
    const query = this.putQueryParams(film.title, film.averageRating);

    const { Attributes: attributes }: DocumentClient.PutItemOutput = await this.client.put(query).promise();
    if (!attributes) {
      return;
    }

    return this.extractFilm(attributes);
  }

  private getQueryParams(title: string): DocumentClient.GetItemInput {
    return {
      TableName: tableName,
      Key: {
        title,
      },
    };
  }

  private putQueryParams(title: string, averageRating: number): DocumentClient.PutItemInput {
    return {
      TableName: tableName,
      Item: {
        title,
        averageRating,
      },
    };
  }

  private extractFilm(attributeMap: DocumentClient.AttributeMap): Film {
    return <Film>{
      title: attributeMap.title,
      averageRating: parseFloat(attributeMap.averageRating),
    };
  }
}
