import { FilmService } from './film';

const filmService = new FilmService();
const title = process.argv[2];

filmService.getFilm(title)
  .then(console.log)
  .catch(error => console.error('error', error));
