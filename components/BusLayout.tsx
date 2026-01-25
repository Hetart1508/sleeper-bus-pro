
import React from 'react';
import { Seat, BerthType, SeatStatus } from '../types';

interface BusLayoutProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatToggle: (seat: Seat) => void;
}

const BusLayout: React.FC<BusLayoutProps> = ({ seats, selectedSeats, onSeatToggle }) => {
  const lowerBerths = seats.filter(s => s.berth === BerthType.LOWER);
  const upperBerths = seats.filter(s => s.berth === BerthType.UPPER);

  const renderSeatGrid = (berthSeats: Seat[], label: string) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
        <span className="w-2 h-6 bg-indigo-500 rounded-full mr-2"></span>
        {label} Berth
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {berthSeats.map((seat) => {
          const isSelected = selectedSeats.find(s => s.id === seat.id);
          const isBooked = seat.status === SeatStatus.BOOKED;

          return (
            <button
              key={seat.id}
              disabled={isBooked}
              onClick={() => onSeatToggle(seat)}
              className={`
                relative h-20 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center
                ${isBooked ? 'bg-slate-100 border-slate-200 cursor-not-allowed opacity-50' : 
                  isSelected ? 'bg-indigo-100 border-indigo-600 shadow-inner' : 
                  'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}
              `}
            >
              <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-500'}`}>
                {seat.number}
              </span>
              <div className={`mt-1 w-8 h-12 border-2 rounded ${isSelected ? 'border-indigo-500' : 'border-slate-300'}`}></div>
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-slate-300 rotate-45"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {renderSeatGrid(lowerBerths, 'Lower')}
      {renderSeatGrid(upperBerths, 'Upper')}
    </div>
  );
};

export default BusLayout;
