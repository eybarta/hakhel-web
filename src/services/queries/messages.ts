import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchMessages,
  fetchSentMessages,
  deleteMessage,
  blastMessage,
} from '@services/api/messagesApi';
import type { MessageInterface } from '@type/messagesInterface';
import { queryKeys } from './queryKeys';

export const useFutureMessages = () =>
  useQuery<MessageInterface[]>({
    queryKey: queryKeys.messages.future,
    queryFn: fetchMessages,
  });

export const useSentMessages = () =>
  useQuery<MessageInterface[]>({
    queryKey: queryKeys.messages.sent,
    queryFn: fetchSentMessages,
  });

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteMessage,
    onSuccess: (_, id) => {
      queryClient.setQueryData<MessageInterface[]>(
        queryKeys.messages.future,
        previous =>
          previous ? previous.filter(message => message.id !== id) : previous
      );
    },
  });
};

export const useBlastMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: blastMessage,
    onSuccess: (_, id) => {
      queryClient.setQueryData<MessageInterface[]>(
        queryKeys.messages.future,
        previous =>
          previous ? previous.filter(message => message.id !== id) : previous
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.sent });
    },
  });
};
