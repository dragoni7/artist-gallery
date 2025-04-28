import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a DELETE request to delete an image.
 * @param url the url of the image to remove.
 * @param role the user's roles.
 */
export async function deleteImage(url: string, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/Api/RemoveImage', {
      method: 'DELETE',
      body: JSON.stringify(
        url.replace('https://oniiyannastorage.blob.core.windows.net/container-images/', '')
      ),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Deleted image from storage.');
  } catch (err) {
    toast.error('Error deleting image from storage: ' + err);
  }
}
