import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCemeteries, deleteCemetery } from '@services/api/cemeteriesApi';
import type { CemeteryInterface } from '@type/cemeteriesInterface';
import type { Options } from '@type/options';
import { queryKeys } from './queryKeys';

export const useCemeteries = () =>
  useQuery<CemeteryInterface[]>({
    queryKey: queryKeys.cemeteries,
    queryFn: fetchCemeteries,
  });

export const useDeleteCemetery = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: deleteCemetery,
    onSuccess: (_, id) => {
      queryClient.setQueryData<CemeteryInterface[]>(
        queryKeys.cemeteries,
        previous =>
          previous ? previous.filter(cemetery => cemetery.id !== id) : previous
      );
    },
  });
};

export const useCemeteryOptions = () => {
  const { data = [] } = useCemeteries();

  return useMemo<Options>(
    () =>
      data.map(cemetery => ({
        label: cemetery.name,
        value: cemetery.id || '',
      })),
    [data]
  );
};
