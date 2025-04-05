import { CommissionDto } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

export async function createCommission(data: CommissionDto, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/data-api/rest/Queue', {
      method: 'POST',
      body: JSON.stringify({
        Description: data.description,
        Tier: data.tier,
        Completed: data.completed,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Created new commission');
  } catch (err) {
    toast.error('Error creating commission: ' + err);
  }
}
