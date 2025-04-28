import { Post } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a PUT request, updating a post in the db.
 * @param data The updated data.
 * @param role The user's roles.
 */
export async function updatePost(data: Post, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/Post/Id/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        Source: data.source,
        Description: data.description,
        Tags: data.tags.map((t) => t.name).join(','),
        Date: data.date,
        Title: data.title,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Updated post!');
  } catch (err) {
    toast.error('Error updating post: ' + err);
  }
}
