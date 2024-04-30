// state/selectors.js
import { selector } from 'recoil';
import fetchCemeteries from '../api/cemeteries';
import fetchDeceasedPeople from '../api/deceasedPeople';

export const cemeteriesDataSelector = selector({
  key: 'cemeteriesDataSelector',
  get: async () => {
    try {
      const data = await fetchCemeteries();
      return data;
    } catch (error) {
      throw error;
    }
  },
});

export const deceasedDataSelector = selector({
  key: 'deceasedDataSelector',
  get: async () => {
    try {
      const data = await fetchDeceasedPeople();
      return data;
    } catch (error) {
      throw error;
    }
  },
});
