import '@testing-library/jest-dom';
import mockAxios from 'jest-mock-axios';

let consoleSpy: jest.SpyInstance;
beforeAll(() => {
  consoleSpy = jest
    .spyOn(global.console, 'error')
    .mockImplementation(message => {
      if (!message?.message?.includes('Could not parse CSS stylesheet')) {
        global.console.warn(message);
      }
    });
});

afterAll(() => consoleSpy.mockRestore());
afterEach(() => {
  mockAxios.reset();
});
