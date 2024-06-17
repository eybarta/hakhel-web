import { atom } from 'recoil';
import { DeceasedPersonInterface } from '@type/deceasedInterface';

export const deceasedPeopleAtom = atom<DeceasedPersonInterface[]>({
  key: 'deceasedPeopleAtom',
  default: [],
});
