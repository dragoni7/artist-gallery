import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a POST request, creating a new twitter post.
 * @param files Images to include in the post.
 * @param text Text to include in the post.
 * @param role The user's roles.
 * @returns The created tweet url.
 */
export async function createTwitterPost(
  files: FileList,
  text: string,
  role: string[]
): Promise<string | null> {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const formData = new FormData();
    formData.append('text', text);

    for (let i = 0; i < files.length; i++) {
      formData.append('file' + (i + 1), files[i], files[i].name);
    }

    const response = await fetch('/Api/UploadMediaTweet', {
      method: 'POST',
      body: formData,
      headers: {
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const result: string = await response.text();
    toast.success('Tweet created! \n' + result);
    return result;
  } catch (err) {
    toast.error('Error creating tweet: ' + err);
    return null;
  }
}
