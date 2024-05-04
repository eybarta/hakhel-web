// state/selectors.js
import { atomFamily, selector } from 'recoil';
import fetchCemeteries from '../api/cemeteries';
import fetchDeceasedPeople from '../api/deceasedPeople';

export const cemeteriesFetchVersionAtom = atomFamily({
  key: 'cemeteriesFetchVersion',
  default: 0,
});
export const cemeteriesDataSelector = selector({
  key: 'cemeteriesDataSelector',
  get: async ({ get }) => {
    try {
      const version = get(cemeteriesFetchVersionAtom('latest'));
      console.log('Cemeteries fetching version > ', version);
      const data = await fetchCemeteries();
      return data;
    } catch (error) {
      console.error('error: ', error);
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
