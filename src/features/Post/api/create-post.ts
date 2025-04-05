import { PostDto } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function createPost(data: PostDto, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/Post', {
      method: 'POST',
      body: JSON.stringify({
        Source: data.source,
        Description: data.description,
        Tags: data.tags.join(','),
        Date: data.date,
        Title: data.title,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Gallery post created!');
  } catch (err) {
    toast.error('Error creating gallery post: ' + err);
  }
}
