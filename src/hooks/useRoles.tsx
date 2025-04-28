import { UserRoles } from '@/util/consts';
import { useCallback, useEffect, useState } from 'react';

/**
 * The current user's roles
 */
export default function useRoles() {
  const [roles, setRoles] = useState<UserRoles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updateRoles = useCallback(async () => {
    try {
      const response = await fetch('/.auth/me');

      if (!response.ok) throw new Error('Error fetching user data!');

      const userInfo = await response.json();
      setRoles(userInfo.clientPrincipal.userRoles);
    } catch (err) {
      console.log(err);
    }
  }, [roles]);

  useEffect(() => {
    updateRoles();
    setLoading(false);
  }, []);

  return { roles, loading };
}
