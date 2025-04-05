import { OC } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function updateOC(data: OC, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch(`/data-api/rest/OC/Name/${data.name}`, {
      method: 'PUT',
      body: JSON.stringify({
        TagName: data.tag.name,
        Description: data.description,
        HeaderImage: data.headerImg,
        DescriptionImage: data.descriptionImg,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Updated oc!');
  } catch (err) {
    toast.error('Error updating oc: ' + err);
  }
}
