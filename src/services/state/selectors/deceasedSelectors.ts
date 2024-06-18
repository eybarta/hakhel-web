import { selector, selectorFamily } from 'recoil';
import { fetchAllDeceased, deleteDeceased } from '@services/api/deceasedApi';
import { deceasedAtom } from '@services/state/atoms/deceasedAtoms';

export const deceasedDataSelector = selector({
  key: 'deceasedDataSelector',
  get: async () => {
    try {
      return await fetchAllDeceased();
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
  },
  set: ({ set }, newDeceasedPeople) => {
    set(deceasedAtom, newDeceasedPeople);
  },
});

export const deleteDeceasedSelector = selectorFamily<void, number>({
  key: 'deleteDeceasedSelector',
  get: (id: number) => async () => {
    try {
      return await deleteDeceased(id);
    } catch (error) {
      console.error('Deletion error: ', error);
      throw error;
    }
  },
  set:
    (id: number) =>
    ({ set }) => {
      set(deceasedAtom, prevState =>
        prevState.filter(person => person.id !== id)
      );
    },
});
