import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

export const queryClient = createQueryClient();

export type PersistOptions = Omit<PersistQueryClientOptions, 'queryClient'>;

const getPersistOptions = (): PersistOptions | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return {
    persister: createAsyncStoragePersister({
      storage: window.sessionStorage,
    }),
    maxAge: 1000 * 60 * 60,
  };
};

export const persistOptions = getPersistOptions();
