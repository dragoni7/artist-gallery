import { Post } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function deletePost(data: Post, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/Post/Id/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Deleted ' + data.title);
  } catch (err) {
    toast.error('Error deleting post: ' + err);
  }
}
