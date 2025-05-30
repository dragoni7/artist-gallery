import { Tag } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a POST request, adding a new tag to the db.
 * @param data The tag to create.
 * @param role The user's roles.
 */
export async function createTag(data: Tag, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/Tag', {
      method: 'POST',
      body: JSON.stringify({ Name: data.name }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Tag created!');
  } catch (err) {
    toast.error('Error creating tag: ' + err);
  }
}
