import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function createBlueskyPost(files: FileList, text: string, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const formData = new FormData();
    formData.append('text', text);

    for (let i = 0; i < files.length; i++) {
      formData.append('file' + (i + 1), files[i], files[i].name);
    }

    const response = await fetch('/Api/UploadImagePost', {
      method: 'POST',
      body: formData,
      headers: {
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const result = await response.json();
    toast.success('Bluesky post created! \n' + result.uri);
  } catch (err) {
    toast.error('Error posting to bluesky: ' + err);
  }
}
