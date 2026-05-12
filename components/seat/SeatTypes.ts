export type SeatStatus = 'AVAILABLE' | 'SELECTED' | 'BOOKED';

export type BerthType = 'UPPER' | 'LOWER';

export type SeatGender = 'Male' | 'Female';

export type SeatCategory = 'NORMAL' | 'LADIES';

export type Seat = {
  id: string;
  number: string;
  berth: BerthType;
  category: SeatCategory;
  gender: SeatGender;
  status: SeatStatus;
  price: number;
};

