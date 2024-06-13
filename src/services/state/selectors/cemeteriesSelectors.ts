import { selector, selectorFamily } from 'recoil';
import { fetchCemeteries, deleteCemetery } from '@api/cemeteries';
import { cemeteriesAtom } from '@services/state/atoms/cemeteriesAtoms';

export const cemeteriesDataSelector = selector({
  key: 'cemeteriesDataSelector',
  get: async () => {
    try {
      return await fetchCemeteries();
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
  },
  set: ({ set }, newCemetery) => {
    set(cemeteriesAtom, newCemetery);
  },
});

export const deleteCemeterySelector = selectorFamily<void, number>({
  key: 'deleteCemeterySelector',
  get: (id: number) => async () => {
    try {
      return await deleteCemetery(id);
    } catch (error) {
      console.error('Deletion error: ', error);
      throw error;
    }
  },
  set:
    (id: number) =>
    ({ set }) => {
      set(cemeteriesAtom, prevState =>
        prevState.filter(cemetery => cemetery.id !== id)
      );
    },
});
