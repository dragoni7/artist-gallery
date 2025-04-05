import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function updateStatus(status: boolean, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/OniiyannaStatus/Id/1', {
      method: 'PUT',
      body: JSON.stringify({ Open: status }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);
    toast.success('Updated opened to ' + status);
  } catch (err) {
    toast.error('Error updating status: ' + err);
  }
}
