import axios from 'axios';

import { scraperService } from './scraperService';
import { mockParams, mockResponse, mockUrl } from './scraperService.mock';

jest.mock('axios');

describe('Scraper Service', () => {
  it('should request given URL with provided query params', () => {
    axios.get.mockResolvedValue({ data: mockResponse });

    return scraperService.getWebpage(mockUrl, mockParams)
      .then((webpage: string) => {
        expect(axios.get).toBeCalledWith(mockUrl, { params: mockParams });
        expect(webpage).toEqual(mockResponse);
      });
  });
});
