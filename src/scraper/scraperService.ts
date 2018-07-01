import axios, { AxiosResponse, AxiosStatic } from 'axios';
import cheerio from 'cheerio';

export class ScraperService {
  constructor(
    private axios: AxiosStatic,
    private cheerio: CheerioAPI,
  ) { }

  async getParsedWebpage(baseUrl: string, params: { [param: string]: string | number} = {}): Promise<CheerioStatic> {
    const webpage: string = await this.getWebpage(baseUrl, params);
    const parsedWebpage: CheerioStatic = this.parseWebpage(webpage);

    return parsedWebpage;
  }

  private getWebpage(baseUrl: string, params: { [param: string]: string | number}): Promise<string> {
    return this.axios.get<string>(baseUrl, { params })
      .then((response: AxiosResponse<string>) => response.data);
  }

  private parseWebpage(webpage: string): CheerioStatic {
    return this.cheerio.load(webpage);
  }
}

export const scraperService = new ScraperService(axios, cheerio);
