import { Film } from './film';
import { FilmDao } from './filmDao';
import { GetFilmStrategy, GetFilmWithScraperStrategy } from './strategies';

export class FilmService {
  private dao: FilmDao;
  private getFilmWithScraperStrategy: GetFilmStrategy;

  constructor() {
    this.dao = new FilmDao();
    this.getFilmWithScraperStrategy = new GetFilmWithScraperStrategy();
  }

  async getFilm(title: string): Promise<Film> {
    const filmFromDb: Film = await this.dao.getFilmByTitle(title);
    if (filmFromDb) {
      return filmFromDb;
    }

    const film: Film = await this.getFilmByTitle(title, this.getFilmWithScraperStrategy);
    await this.dao.saveFilm(film);

    return film;
  }

  private getFilmByTitle(title: string, strategy: GetFilmStrategy): Promise<Film> {
    return strategy.getFilmByTitle(title);
  }
}
