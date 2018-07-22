import axios from 'axios';
import cheerio from 'cheerio';

import { ScraperService } from './scraperService';
import { mockParams, mockResponse, mockUrl } from './scraperService.mock';

describe('Scraper Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should request given URL with provided query params', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mockResponse });
    cheerio.load = jest.fn();
    const scraperService: ScraperService = new ScraperService(axios, cheerio);

    await scraperService.getParsedWebpage(mockUrl, mockParams);

    expect(axios.get).toBeCalledWith(mockUrl, { params: mockParams });
    expect(cheerio.load).toBeCalled();
  });
});
