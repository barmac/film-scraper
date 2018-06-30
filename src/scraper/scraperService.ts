import axios, { AxiosPromise, AxiosResponse, AxiosStatic } from 'axios';

export class ScraperService {
  constructor(private axios: AxiosStatic) { }

  getWebpage(baseUrl: string, params: { [param: string]: string | number} = {}): Promise<string> {
    return this.axios.get<string>(baseUrl, { params })
      .then((response: AxiosResponse<string>) => response.data);
  }
}

export const scraperService = new ScraperService(axios);
