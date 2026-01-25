
export enum BerthType {
  LOWER = 'LOWER',
  UPPER = 'UPPER'
}

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  SELECTED = 'SELECTED'
}

export interface Seat {
  id: string;
  number: string;
  berth: BerthType;
  status: SeatStatus;
  price: number;
}

export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface PassengerInfo {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
}

export interface BookingData {
  selectedSeats: Seat[];
  selectedMeals: { mealId: string; quantity: number }[];
  passenger: PassengerInfo;
  route: {
    from: string;
    to: string;
    date: string;
  };
}
