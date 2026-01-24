import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllDeceased, deleteDeceased } from '@services/api/deceasedApi';
import type { DeceasedPersonInterface } from '@type/deceasedInterface';
import { queryKeys } from './queryKeys';

export const useDeceased = () =>
  useQuery<DeceasedPersonInterface[]>({
    queryKey: queryKeys.deceased,
    queryFn: fetchAllDeceased,
  });

export const useDeleteDeceased = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: deleteDeceased,
    onSuccess: (_, id) => {
      queryClient.setQueryData<DeceasedPersonInterface[]>(
        queryKeys.deceased,
        previous => (previous ? previous.filter(person => person.id !== id) : previous)
      );
    },
  });
};
