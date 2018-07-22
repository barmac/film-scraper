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

  getFilmFromDb(title: string): Promise<Film> {
    return this.dao.getFilmByTitle(title);
  }

  getFilmWithScraper(title: string): Promise<Film> {
    return this.getFilmWithScraperStrategy.getFilmByTitle(title);
  }

  saveFilm(film: Film): Promise<Film> {
    return this.dao.saveFilm(film);
  }
}
