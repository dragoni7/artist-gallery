import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Search params that retain previous values upon updating.
 */
export default function usePersistantSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (key: string, value: any) => {
      setSearchParams(() => {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }

        return searchParams;
      });
    },
    [searchParams]
  );

  return { searchParams, updateSearchParams };
}
