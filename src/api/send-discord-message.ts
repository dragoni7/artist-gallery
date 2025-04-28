import { DiscordChannel } from '@/types';
import { UserRoles } from '@/util/consts';
import { toast } from 'react-toastify';

/**
 * Creates a POST request, sending a message in the discord server.
 * @param channel The server channel to send the message in.
 * @param message The message contents.
 * @param role The user's roles.
 */
export async function sendDiscordMessage(channel: DiscordChannel, message: string, role: string[]) {
  try {
    if (!role.includes(UserRoles.ADMIN)) throw new Error('missing required permissions');

    const response = await fetch('/Api/SendDiscordMessage', {
      method: 'POST',
      body: JSON.stringify({ channel: channel, message: message }),
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': UserRoles.ADMIN,
      },
    });

    if (!response.ok) throw new Error(response.statusText);
    toast.success('Created discord message ' + status);
  } catch (err) {
    toast.error('Error creating discord message: ' + err);
  }
}
