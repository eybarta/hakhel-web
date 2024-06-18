import { selector, selectorFamily } from 'recoil';
import { fetchContacts, deleteContact } from '@api/contactsApi';
import { contactsAtom } from '@services/state/atoms/contactsAtoms';

export const contactsDataSelector = selector({
  key: 'contactsDataSelector',
  get: async () => {
    try {
      return await fetchContacts();
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
  },
  set: ({ set }, newContact) => {
    set(contactsAtom, newContact);
  },
});

export const deleteContactsSelector = selectorFamily<void, number>({
  key: 'deleteContactsSelector',
  get: (id: number) => async () => {
    try {
      return await deleteContact(id);
    } catch (error) {
      console.error('Deletion error: ', error);
      throw error;
    }
  },
  set:
    (id: number) =>
    ({ set }) => {
      set(contactsAtom, prevState =>
        prevState.filter(person => person.id !== id)
      );
    },
});
