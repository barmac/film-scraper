import axios from 'axios';
import cheerio from 'cheerio';

import { ScraperService } from './scraperService';
import { mockBody, mockParams, mockResponse, mockUrl } from './scraperService.mock';

const scraperService: ScraperService = new ScraperService(axios, cheerio);

describe('Scraper Service', () => {
  it('should request given URL with provided query params', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mockResponse });
    const $ = await scraperService.getParsedWebpage(mockUrl, mockParams);

    expect(axios.get).toBeCalledWith(mockUrl, { params: mockParams });
    expect($('body').text()).toEqual(mockBody);
  });
});
