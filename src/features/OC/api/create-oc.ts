import { OC } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function createOC(data: OC, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/OC', {
      method: 'POST',
      body: JSON.stringify({
        Name: data.name,
        TagName: data.tag.name,
        Description: data.description,
        DescriptionImage: data.descriptionImg,
        HeaderImage: data.headerImg,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('OC created!');
  } catch (err) {
    toast.error('Error creating oc: ' + err);
  }
}
