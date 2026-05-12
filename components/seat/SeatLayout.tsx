import React, { useMemo } from 'react';
import SeatCard from './SeatCard';
import { BerthType, Seat } from './SeatTypes';

type SeatLayoutProps = {
  seats: Seat[];
  selectedSeatIds: Set<string>;
  onToggle: (seat: Seat) => void;
};

const SeatLayout: React.FC<SeatLayoutProps> = ({ seats, selectedSeatIds, onToggle }) => {
  const lower = useMemo(() => seats.filter(s => s.berth === 'LOWER'), [seats]);
  const upper = useMemo(() => seats.filter(s => s.berth === 'UPPER'), [seats]);

  const renderBerth = (berth: BerthType, berthSeats: Seat[]) => {
    // Indian style: 5 per row (mobile scroll friendly)
    const rows = [0, 1, 2]; // 15 seats => 3 rows
    const colsPerRow = 5;

    return (
      <div className="min-w-[640px] md:min-w-0 md:flex-1">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-600/10 border border-indigo-200 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {berth} BERTH
                </div>
                <div className="text-lg font-black text-slate-800">
                  {berth === 'LOWER' ? 'Lower Berths' : 'Upper Berths'}
                </div>
              </div>
            </div>
            <div className="text-xs font-black text-slate-500">{berthSeats.length} seats</div>
          </div>

          <div className="p-5">
            {rows.map((r) => (
              <div key={r} className="grid grid-cols-5 gap-3 mb-3 last:mb-0">
                {berthSeats
                  .slice(r * colsPerRow, r * colsPerRow + colsPerRow)
                  .map(seat => {
                    const effectiveSeat: Seat = {
                      ...seat,
                      status: seat.status === 'BOOKED' ? 'BOOKED' : selectedSeatIds.has(seat.id) ? 'SELECTED' : 'AVAILABLE',
                    };
                    return <SeatCard seat={effectiveSeat} onToggle={onToggle} />;
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 overflow-x-auto">
        <div className="min-w-[1320px] md:min-w-0 md:flex md:gap-6">
          {/* Driver cabin placeholder */}
          <div className="hidden md:block md:w-[300px]">
            <div className="rounded-3xl border-2 border-slate-200 p-4 bg-slate-50">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Driver Cabin</div>
              <div className="mt-2 h-20 rounded-2xl bg-gradient-to-r from-slate-300 to-slate-200" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-6 rounded-xl bg-white border border-slate-200 shadow-sm" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {renderBerth('LOWER', lower)}
            {renderBerth('UPPER', upper)}
          </div>
        </div>

        {/* Mobile guidance */}
        <div className="mt-4 text-xs font-bold text-slate-400">
          Tip: On mobile, swipe horizontally to view full layout.
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;

