import mockAxios from 'jest-mock-axios';
// export default mockAxios;

// import axios from 'axios';
import mockDeceasedData from './data/mockDeceasedData';
import mockCemeteriesData from './data/mockCemeteriesData';

// const mockAxios = jest.createMockFromModule('axios');

mockAxios.create = jest.fn(() => mockAxios);

mockAxios.get = jest.fn(url => {
  if (url.includes('deceasedPeople')) {
    return Promise.resolve({ data: mockDeceasedData });
  }
  if (url.includes('cemeteries')) {
    return Promise.resolve({ data: mockCemeteriesData });
  }
  return Promise.reject(new Error('Not found'));
});

export default mockAxios;
