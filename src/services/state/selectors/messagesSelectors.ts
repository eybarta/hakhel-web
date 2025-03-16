import { useRecoilCallback, selector } from 'recoil';
import { messagesAtom, messagesLoadingAtom, messagesErrorAtom } from '../atoms/messagesAtoms';
import { fetchMessages, deleteMessage } from '../../api/messagesApi';

export const messagesDataSelector = selector({
  key: 'messagesDataSelector',
  get: async () => {
    const messages = await fetchMessages();
    return messages;
  },
});

export const useFetchMessagesCallback = () =>
  useRecoilCallback(({ set }) => async () => {
    set(messagesLoadingAtom, true);
    set(messagesErrorAtom, null);
    try {
      const messages = await fetchMessages();
      set(messagesAtom, messages);
    } catch (error) {
      set(messagesErrorAtom, error instanceof Error ? error.message : 'An error occurred');
      throw error;
    } finally {
      set(messagesLoadingAtom, false);
    }
  });

export const useDeleteMessageCallback = () =>
  useRecoilCallback(({ snapshot, set }) => async (id: number) => {
    set(messagesLoadingAtom, true);
    set(messagesErrorAtom, null);
    try {
      await deleteMessage(id);
      const currentMessages = await snapshot.getPromise(messagesAtom);
      set(messagesAtom, currentMessages.filter(message => message.id !== id));
    } catch (error) {
      set(messagesErrorAtom, error instanceof Error ? error.message : 'An error occurred');
      throw error;
    } finally {
      set(messagesLoadingAtom, false);
    }
  }); 