import { Commission } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Deletes a queue entry.
 * @param data The commission to remove from the queue.
 * @param role The user's roles.
 */
export async function deleteCommission(data: Commission, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/Queue/Id/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Deleted ' + data.description);
  } catch (err) {
    toast.error('Error deleting commission: ' + err);
  }
}
