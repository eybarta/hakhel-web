import { atom } from 'recoil';
import { DeceasedPersonInterface } from '@type/deceasedInterface';

export const deceasedAtom = atom<DeceasedPersonInterface[]>({
  key: 'deceasedAtom',
  default: [],
});
