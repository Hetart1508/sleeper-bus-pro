
import { Meal } from './types';

export const STATIONS = [
  'Ahmedabad',
  'Nadiad',
  'Vadodara',
  'Surat',
  'Vapi',
  'Mumbai'
];

export const MEALS: Meal[] = [
  {
    id: 'm1',
    name: 'Standard Veg Thali',
    price: 150,
    description: 'Roti, Sabzi, Dal, Rice, and Sweet.',
    image: 'https://picsum.photos/seed/thali/200/200'
  },
  {
    id: 'm2',
    name: 'Paneer Butter Masala Combo',
    price: 180,
    description: 'Paneer Butter Masala with 2 Naans.',
    image: 'https://picsum.photos/seed/paneer/200/200'
  },
  {
    id: 'm3',
    name: 'Quick Sandwich & Juice',
    price: 120,
    description: 'Club Sandwich with Fresh Orange Juice.',
    image: 'https://picsum.photos/seed/sandwich/200/200'
  }
];

export const TOTAL_SEATS = 30; // 15 lower, 15 upper
