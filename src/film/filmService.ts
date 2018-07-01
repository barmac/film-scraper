import { Film } from './film';
import { scraperService, ScraperService }  from '../scraper';
import { filmwebSearchUri } from '../config/filmwebConfig';

const resultsQuery = '.resultsList .hits__item .dataHit';
const ratingsQuery = '.resultsList .hits__item .filmPreview__rateBox';

export class FilmService {
  constructor(private scraper: ScraperService) {}

  async getFilmByTitle(title: string): Promise<Film> {
    const film: Film = await this.getFilmFromWebpage(title);

    return film;
  }

  private async getFilmFromWebpage(searchTerm: string): Promise<Film> {
    const params = this.getSearchQuery(searchTerm);
    const $: CheerioStatic = await this.scraper.getParsedWebpage(filmwebSearchUri, params);

    const results = this.getResultsList($);

    if (!results.length) {
      return;
    }

    const firstHit = results.first();
    const title = firstHit.data('title');
    const rating = this.getFirstRating($).data('rate');

    return new Film(title, rating);
  }

  private getSearchQuery(searchTerm: string): { q: string } {
    return { q: searchTerm };
  }

  private getResultsList($: CheerioStatic): Cheerio {
    return $(resultsQuery);
  }

  private getFirstRating($: CheerioStatic): Cheerio {
    return $(ratingsQuery).first();
  }
}

export const filmService = new FilmService(scraperService);
