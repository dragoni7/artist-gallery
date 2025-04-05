import { useEffect, useState } from 'react';

export default function useStatus() {
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchStatus() {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/OniiyannaStatus');

      if (!response.ok) throw new Error('Error fetching status!');

      const status = await response.json();
      setStatus(status.value[0].Open);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  return { status, fetchStatus, loading };
}
