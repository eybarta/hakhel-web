import { useRecoilCallback, selector } from 'recoil';
import {
  messagesAtom,
  messagesLoadingAtom,
  messagesErrorAtom,
  sentMessagesAtom,
  sentMessagesLoadingAtom,
  sentMessagesErrorAtom,
} from '../atoms/messagesAtoms';
import { fetchMessages, fetchSentMessages, deleteMessage, blastMessage } from '../../api/messagesApi';

export const messagesDataSelector = selector({
  key: 'messagesDataSelector',
  get: async () => {
    const messages = await fetchMessages();
    return messages;
  },
});

export const sentMessagesDataSelector = selector({
  key: 'sentMessagesDataSelector',
  get: async () => {
    const messages = await fetchSentMessages();
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

export const useFetchSentMessagesCallback = () =>
  useRecoilCallback(({ set }) => async () => {
    set(sentMessagesLoadingAtom, true);
    set(sentMessagesErrorAtom, null);
    try {
      const messages = await fetchSentMessages();
      set(sentMessagesAtom, messages);
    } catch (error) {
      set(sentMessagesErrorAtom, error instanceof Error ? error.message : 'An error occurred');
      throw error;
    } finally {
      set(sentMessagesLoadingAtom, false);
    }
  });

export const useBlastMessageCallback = () =>
  useRecoilCallback(({ snapshot, set }) => async (id: number) => {
    set(messagesLoadingAtom, true);
    set(messagesErrorAtom, null);
    try {
      await blastMessage(id);
      // Remove the message from future messages
      const currentMessages = await snapshot.getPromise(messagesAtom);
      set(messagesAtom, currentMessages.filter(message => message.id !== id));
      // Refresh sent messages
      const sentMessages = await fetchSentMessages();
      set(sentMessagesAtom, sentMessages);
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