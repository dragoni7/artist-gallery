import { CommissionRequest } from '@/types';
import { toast } from 'react-toastify';

/**
 * Creates a POST request, sending a commission request email through the api.
 * @param data request data.
 */
export async function createCommissionRequest(data: CommissionRequest) {
  try {
    const response = await fetch('/Api/SendEmail', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    toast.success('Your request was sent!');
  } catch (err) {
    toast.error('Error sending request');
  }
}
