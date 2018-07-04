import { GetFilmStrategy } from './getFilmStrategy';
import { Film } from '../film';
import { filmwebSearchUri } from '../../config/filmwebConfig';
import { ScraperService } from '../../scraper';

const resultsQuery = '.resultsList .hits__item .dataHit';
const ratingsQuery = '.resultsList .hits__item .filmPreview__rateBox';


export class GetFilmWithScraperStrategy implements GetFilmStrategy {
  constructor(private scraper: ScraperService) {}

  async getFilmByTitle(title: string): Promise<Film> {
    const params = this.getSearchQuery(title);
    const $: CheerioStatic = await this.scraper.getParsedWebpage(filmwebSearchUri, params);

    const results = this.getResultsList($);

    if (!results.length) {
      return;
    }

    const firstHit = results.first();
    const filmTitle = firstHit.data('title');
    const rating = this.getFirstRating($).data('rate');

    return new Film(filmTitle, rating);
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
