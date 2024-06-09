import { atom } from 'recoil';
import { DeceasedPersonInterface } from '@type/deceased';

export const deceasedPeopleAtom = atom<DeceasedPersonInterface[]>({
  key: 'deceasedPeopleAtom',
  default: [],
});
