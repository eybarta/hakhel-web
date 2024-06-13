import { selector, selectorFamily } from 'recoil';
import { fetchDeceasedPeople, deleteDeceasedPerson } from '@api/deceasedPeople';
import { deceasedPeopleAtom } from '@services/state/atoms/deceasedAtoms';

export const deceasedDataSelector = selector({
  key: 'deceasedDataSelector',
  get: async () => {
    try {
      return await fetchDeceasedPeople();
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
  },
  set: ({ set }, newDeceasedPeople) => {
    set(deceasedPeopleAtom, newDeceasedPeople);
  },
});

export const deleteDeceasedSelector = selectorFamily<void, number>({
  key: 'deleteDeceasedSelector',
  get: (id: number) => async () => {
    try {
      return await deleteDeceasedPerson(id);
    } catch (error) {
      console.error('Deletion error: ', error);
      throw error;
    }
  },
  set:
    (id: number) =>
    ({ set }) => {
      set(deceasedPeopleAtom, prevState =>
        prevState.filter(person => person.id !== id)
      );
    },
});
