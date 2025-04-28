import { Commission } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Updates an entry in the queue.
 * @param data The commission to edit in the queue.
 * @param role The user's roles.
 */
export async function updateCommission(data: Commission, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/Queue/Id/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        Description: data.description,
        Tier: data.tier,
        Completed: data.completed,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Updated ' + data.description);
  } catch (err) {
    toast.error('Error updating commission: ' + err);
  }
}
