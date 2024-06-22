import { selector, selectorFamily } from 'recoil';
import { fetchCemeteries, deleteCemetery } from '@services/api/cemeteriesApi';
import { cemeteriesAtom } from '@services/state/atoms/cemeteriesAtoms';
import { Options } from '@type/options';
import { CemeteryInterface } from '@type/cemeteriesInterface';

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

export const cemeteryOptionsSelector = selector<Options>({
  key: 'cemeteryOptionsSelector',
  get: ({ get }) => {
    try {
      const cemeteries: CemeteryInterface[] = get(cemeteriesAtom);
      console.log('>>> cemeteries: ', cemeteries);
      return cemeteries.map(cemetery => ({
        label: cemetery.name,
        value: cemetery.id || '',
      }));
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
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
