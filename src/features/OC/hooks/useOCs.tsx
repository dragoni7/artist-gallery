import { OC } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Provides a list of OCs from the db.
 */
export default function useOCs() {
  const [ocs, setOCs] = useState<OC[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOCs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/data-api/rest/OC');

      if (!response.ok) throw new Error('Error fetching OCs!');

      const ocs = await response.json();
      setOCs(
        ocs.value.map((oc: any): OC => {
          return {
            name: oc.Name,
            tag: { name: oc.TagName },
            description: oc.Description,
            descriptionImg: oc.DescriptionImage,
            headerImg: oc.HeaderImage,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [ocs]);

  useEffect(() => {
    fetchOCs();
  }, []);

  return { ocs, fetchOCs, loading };
}
