import { atom } from 'recoil';
import { MessageInterface } from '../../../types/messagesInterface';

export const messagesAtom = atom<MessageInterface[]>({
  key: 'messagesAtom',
  default: [],
});

export const messagesLoadingAtom = atom<boolean>({
  key: 'messagesLoadingAtom',
  default: false,
});

export const messagesErrorAtom = atom<string | null>({
  key: 'messagesErrorAtom',
  default: null,
}); 