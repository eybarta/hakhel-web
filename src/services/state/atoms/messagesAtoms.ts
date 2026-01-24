import { atom } from 'recoil';
import { MessageInterface } from '../../../types/messagesInterface';

export const messagesAtom = atom<MessageInterface[]>({
  key: 'messagesAtom',
  default: [],
});

export const sentMessagesAtom = atom<MessageInterface[]>({
  key: 'sentMessagesAtom',
  default: [],
});

export const messagesLoadingAtom = atom<boolean>({
  key: 'messagesLoadingAtom',
  default: false,
});

export const sentMessagesLoadingAtom = atom<boolean>({
  key: 'sentMessagesLoadingAtom',
  default: false,
});

export const messagesErrorAtom = atom<string | null>({
  key: 'messagesErrorAtom',
  default: null,
});

export const sentMessagesErrorAtom = atom<string | null>({
  key: 'sentMessagesErrorAtom',
  default: null,
}); 