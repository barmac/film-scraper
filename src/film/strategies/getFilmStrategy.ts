import { Film } from '../film';

export interface GetFilmStrategy {
  getFilmByTitle(title: string): Promise<Film>;
}
