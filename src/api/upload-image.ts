import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a POST request, uploading an image to backend.
 * @param file The image to upload.
 * @param role The user's roles.
 * @returns The uploaded image's uri.
 */
export async function uploadImage(file: File, role: string[]): Promise<string> {
  let uri: string = '';

  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch('/Api/UploadImage', {
      method: 'POST',
      body: formData,
      headers: {
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const result = await response.text();
    uri = result;
    toast.success('Uploaded image to storage at: \n' + uri);
  } catch (err) {
    toast.error('Error uploading image to storage: ' + err);
  }

  return uri;
}
