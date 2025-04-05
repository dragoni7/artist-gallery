import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function createTwitterPost(files: FileList, text: string, role: string[]) {
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

    toast.success('Tweet created! \n');
  } catch (err) {
    toast.error('Error creating tweet: ' + err);
  }
}
