import { atom } from 'recoil';
import { ContactInterface } from '@type/contactsInterface';

export const contactsAtom = atom<ContactInterface[]>({
  key: 'contactsAtom',
  default: [],
});
