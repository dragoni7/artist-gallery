import { Tag } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Provides list of tags from Tags db table
 */
export default function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/Tag');

      if (!response.ok) throw new Error('Error fetching Tags!');

      const tags = await response.json();
      setTags(
        tags.value
          .reverse()
          .filter((item: any) => item.Name !== 'nsfw')
          .map((item: any): Tag => {
            return {
              name: item.Name,
            };
          })
      );
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [tags]);

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, fetchTags, loading };
}
