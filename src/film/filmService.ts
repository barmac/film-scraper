import { Film } from './film';
import { GetFilmWithScraperStrategy, GetFilmStrategy } from './strategies';
import { scraperService } from '../scraper';

export class FilmService {
  private getFilmWithScraperStrategy: GetFilmStrategy;

  constructor() {
    this.getFilmWithScraperStrategy = new GetFilmWithScraperStrategy(scraperService);
  }

  async getFilm(title: string): Promise<Film> {
    const film: Film = await this.getFilmByTitle(title, this.getFilmWithScraperStrategy);

    return film;
  }

  private getFilmByTitle(title: string, strategy: GetFilmStrategy): Promise<Film> {
    return strategy.getFilmByTitle(title);
  }
}
