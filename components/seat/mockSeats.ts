import { Seat } from './SeatTypes';

// Premium-looking, deterministic mock data
// 15 Lower (L1-L15), 15 Upper (U1-U15) + one Ladies block
export const createMockSeats = (): Seat[] => {
  const seats: Seat[] = [];

  const lowerPrice = 350;
  const upperPrice = 350;

  const ladiesLowerSet = new Set(['L3', 'L4', 'L6', 'L7']);
  const ladiesUpperSet = new Set(['U3', 'U4', 'U6', 'U7']);

  for (let i = 1; i <= 15; i++) {
    const number = `L${i}`;
    const isLadies = ladiesLowerSet.has(number);
    const isBooked = i % 7 === 0 || i % 11 === 0; // deterministic

    seats.push({
      id: `lower-${i}`,
      number,
      berth: 'LOWER',
      category: isLadies ? 'LADIES' : 'NORMAL',
      gender: 'Female',
      status: isBooked ? 'BOOKED' : 'AVAILABLE',
      price: lowerPrice,
    });
  }

  for (let i = 1; i <= 15; i++) {
    const number = `U${i}`;
    const isLadies = ladiesUpperSet.has(number);
    const isBooked = i % 8 === 0 || i % 10 === 0; // deterministic

    seats.push({
      id: `upper-${i}`,
      number,
      berth: 'UPPER',
      category: isLadies ? 'LADIES' : 'NORMAL',
      gender: isLadies ? 'Female' : 'Male',
      status: isBooked ? 'BOOKED' : 'AVAILABLE',
      price: upperPrice,
    });
  }

  return seats;
};

