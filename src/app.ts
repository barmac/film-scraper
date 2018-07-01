import { filmService } from './film';

const title = process.argv[2];

filmService.getFilmByTitle(title)
  .then(console.log)
  .catch(error => console.error('error', error));
