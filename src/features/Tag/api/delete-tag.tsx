import { Tag } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function deleteTag(data: Tag, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/Tag/Name/${data.name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Tag ' + data.name + ' deleted');
  } catch (err) {
    toast.error('Error deleting tag: ' + err);
  }
}
