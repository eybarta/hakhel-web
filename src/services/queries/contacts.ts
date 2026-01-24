import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchContacts, deleteContact } from '@api/contactsApi';
import type { ContactInterface } from '@type/contactsInterface';
import { queryKeys } from './queryKeys';

export const useContacts = () =>
  useQuery<ContactInterface[]>({
    queryKey: queryKeys.contacts,
    queryFn: fetchContacts,
  });

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: deleteContact,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ContactInterface[]>(
        queryKeys.contacts,
        previous => (previous ? previous.filter(person => person.id !== id) : previous)
      );
    },
  });
};
