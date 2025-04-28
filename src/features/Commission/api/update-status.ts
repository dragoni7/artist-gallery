import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Updates the Open row in Oniiyanna status db table.
 * @param commissionsOpen Open value.
 * @param role The user's roles.
 * @returns whether or not the request was successful.
 */
export async function updateStatus(commissionsOpen: boolean, role: string[]): Promise<boolean> {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/OniiyannaStatus/Id/1', {
      method: 'PUT',
      body: JSON.stringify({ Open: commissionsOpen }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);
    toast.success('Updated opened to ' + commissionsOpen);
    return true;
  } catch (err) {
    toast.error('Error updating status: ' + err);
    return false;
  }
}
