import { Commission } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Provides a list of commissions from the db.
 */
export default function useCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCommissions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/Queue');

      if (!response.ok) throw new Error('Error fetching commissions!');

      const commissions = await response.json();
      setCommissions(
        commissions.value
          .map((item: any): Commission => {
            return {
              id: item.Id,
              description: item.Description,
              tier: item.Tier,
              completed: item.Completed,
            };
          })
          .sort((a: Commission, b: Commission) => {
            return b.completed === a.completed ? 0 : b.completed ? -1 : 1;
          })
      );
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [commissions]);

  useEffect(() => {
    fetchCommissions();
  }, []);

  return { commissions, fetchCommissions, loading };
}
