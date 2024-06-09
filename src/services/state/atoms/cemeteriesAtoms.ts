import { CemeteryInterface } from '@type/cemeteries';
import { atom } from 'recoil';

export const cemeteriesAtom = atom<CemeteryInterface[]>({
  key: 'cemeteriesAtom',
  default: [],
});
