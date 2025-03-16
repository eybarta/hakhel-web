import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { RecoilState, RecoilValueReadOnly } from 'recoil';

interface UseRecoilLoaderResult<T> {
  data: T;
  isLoading: boolean;
  hasError: boolean;
  error?: any;
}

/**
 * Custom hook to handle loading data from Recoil selectors into atoms
 * @param atom The Recoil atom to store the data
 * @param selector The Recoil selector to load the data from
 * @returns Object containing the loaded data, loading state, and error state
 */
export function useRecoilLoader<T>(
  atom: RecoilState<T>,
  selector: RecoilValueReadOnly<T>
): UseRecoilLoaderResult<T> {
  const [data, setData] = useRecoilState(atom);
  const loadable = useRecoilValueLoadable(selector);

  useEffect(() => {
    if (loadable.state === 'hasValue') {
      setData(loadable.contents);
    }
  }, [loadable.state, loadable.contents, setData]);

  return {
    data,
    isLoading: loadable.state === 'loading',
    hasError: loadable.state === 'hasError',
    error: loadable.state === 'hasError' ? loadable.contents : undefined
  };
} 