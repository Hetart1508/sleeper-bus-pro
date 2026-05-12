import React from 'react';
import { Seat } from './SeatTypes';

type SeatCardProps = {
  seat: Seat;
  onToggle: (seat: Seat) => void;
};


const SeatCard: React.FC<SeatCardProps> = ({ seat, onToggle }) => {
  const { status, category, berth, number } = seat;

  const isBooked = status === 'BOOKED';
  const isSelected = status === 'SELECTED';
  const isLadies = category === 'LADIES';

  const base =
    'relative group transition-all duration-200 rounded-xl border-2 px-2 py-2 flex flex-col items-center justify-center';

  const statusClass = isBooked
    ? 'bg-slate-200 border-slate-300 cursor-not-allowed opacity-60'
    : isSelected
      ? isLadies
        ? 'bg-fuchsia-50 border-fuchsia-600 shadow-[0_0_0_3px_rgba(192,38,211,0.15)]'
        : 'bg-indigo-50 border-indigo-600 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]'
      : isLadies
        ? 'bg-fuchsia-50/40 border-fuchsia-200 hover:border-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500/10'
        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10';

  return (
    <button
      type="button"
      onClick={() => onToggle(seat)}
      disabled={isBooked}
      aria-disabled={isBooked}
      className={`${base} ${statusClass}`}
      data-berth={berth}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <span
          className={`text-[10px] font-extrabold uppercase tracking-wide ${
            isLadies ? 'text-fuchsia-700' : 'text-indigo-700'
          }`}
        >
          {berth}
        </span>
        {isLadies && (
          <span className="text-[10px] font-extrabold text-fuchsia-700 bg-fuchsia-100 px-2 py-0.5 rounded-full">
            Ladies
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-center">
        <span
          className={`text-sm font-black ${
            isBooked ? 'text-slate-400' : isSelected ? (isLadies ? 'text-fuchsia-700' : 'text-indigo-700') : 'text-slate-700'
          }`}
        >
          {number}
        </span>
      </div>

      <div className="mt-2">
        <div
          className={`h-2 w-12 rounded-full transition-all ${
            isBooked ? 'bg-slate-300' : isSelected ? (isLadies ? 'bg-fuchsia-600' : 'bg-indigo-600') : 'bg-slate-200 group-hover:bg-slate-300'
          }`}
        />
      </div>

      {isSelected && !isBooked && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-indigo-600 text-white text-xs font-black shadow-lg">
            ✓
          </span>
        </div>
      )}
    </button>
  );
};

export default SeatCard;

