import { useSearchParams } from 'react-router-dom';

export default function usePersistantSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: any) => {
    setSearchParams(() => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      return searchParams;
    });
  };

  return { searchParams, updateSearchParams };
}
