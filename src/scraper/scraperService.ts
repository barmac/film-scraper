import axios, { AxiosPromise, AxiosStatic } from 'axios';

export class ScraperService {
  constructor(private axios: AxiosStatic) { }

  getWebpage(baseUrl: string, params: { [param: string]: string | number} = {}): AxiosPromise<string> {
    return this.axios.get<string>(baseUrl, { params });
  }
}

export const scraperService = new ScraperService(axios);
