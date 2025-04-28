import { useCallback, useEffect, useState } from 'react';

/**
 * Provides fields from Oniiyanna status db table
 */
export default function useStatus() {
  const [commissionsOpen, setCommissionsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/OniiyannaStatus');

      if (!response.ok) throw new Error('Error fetching oniiyanna status!');

      const status = await response.json();
      setCommissionsOpen(status.value[0].Open);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [commissionsOpen]);

  useEffect(() => {
    fetchStatus();
  }, []);

  return { commissionsOpen, fetchStatus, loading };
}
