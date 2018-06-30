import { filmwebSearchUri } from './config/filmwebConfig';
import { scraperService } from './scraper/scraperService';

const params = { q: process.argv[2] };

scraperService.getWebpage(filmwebSearchUri, params)
  .then((webpage: string) => {
    console.log('webpage', webpage);
  })
  .catch(error => console.error('Error', error));
