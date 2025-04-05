import { CommissionTier } from '@/types';

export const COMMISSION_TIERS: CommissionTier[] = [
  {
    id: 'chibi',
    label: 'Chibi',
    count: 4,
    cost: 50,
    details: ['+15$ for additional characters.'],
  },
  {
    id: 'flat',
    label: 'Flat Illustration',
    count: 6,
    cost: 90,
    details: [
      '+25$ for additional characters.',
      'Simpler colors and lines with basic to minimal shading.',
    ],
  },
  {
    id: 'refined',
    label: 'Refined Illustration',
    count: 2,
    cost: 105,
    details: [
      '+25$ for additional characters.',
      'Cleaner linework and colors with a more refined shading.',
    ],
  },
  {
    id: 'semi-rendered',
    label: 'Semi-Rendered Illustration',
    count: 1,
    cost: 155,
    details: ['+30$ for additional characters.'],
  },
  {
    id: 'alt-style',
    label: 'Alternate Style Illustration',
    count: 5,
    cost: 180,
    details: ['portraits for 50$', '+50$ for additional characters.', 'SFW only'],
  },
];

export enum UserRoles {
  ANONYMOUS = 'anonymous',
  AUTHENTICATED = 'authenticated',
  ADMIN = 'admin',
}
