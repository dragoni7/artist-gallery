import { UserRoles } from '@/util/consts';
import { useEffect, useState } from 'react';

export default function useRoles() {
  const [roles, setRoles] = useState<UserRoles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function updateRoles() {
    try {
      const response = await fetch('/.auth/me');

      if (!response.ok) throw new Error('Error fetching user data!');

      const userInfo = await response.json();
      setRoles(userInfo.clientPrincipal.userRoles);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    updateRoles();
    setLoading(false);
  }, []);

  return { roles, loading };
}
