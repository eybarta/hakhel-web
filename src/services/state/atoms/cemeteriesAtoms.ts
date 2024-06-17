import { CemeteryInterface } from '@type/cemeteriesInterface';
import { atom } from 'recoil';

export const cemeteriesAtom = atom<CemeteryInterface[]>({
  key: 'cemeteriesAtom',
  default: [],
});
