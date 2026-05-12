import React, { useMemo, useState } from 'react';
import { createMockSeats } from './mockSeats';
import { Seat } from './SeatTypes';
import SeatLayout from './SeatLayout';
import LadiesLegend from './LadiesLegend';

type SeatSelectionModuleProps = {
  onContinue?: (selectedSeats: Seat[]) => void;
};

const SeatSelectionModule: React.FC<SeatSelectionModuleProps> = ({ onContinue }) => {
  const [seats, setSeats] = useState<Seat[]>(() => createMockSeats());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const selectedSeats = useMemo(() => {
    const map = new Map(seats.map(s => [s.id, s] as const));
    return Array.from(selectedIds).map(id => map.get(id)).filter(Boolean) as Seat[];
  }, [seats, selectedIds]);

  const bookedCount = useMemo(() => seats.filter(s => s.status === 'BOOKED').length, [seats]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'BOOKED') return;

    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  };

  const total = useMemo(() => selectedSeats.reduce((sum, s) => sum + s.price, 0), [selectedSeats]);

  const handleContinue = () => {
    // TC02: prevent continue without seat selection
    if (selectedSeats.length === 0) return alert('Select at least one seat');
    onContinue?.(selectedSeats);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sleeper Seat Selection</div>
          <h2 className="text-2xl font-black text-slate-900">Choose your Berth</h2>
          <div className="mt-2 text-sm font-bold text-slate-400">{seats.length} total seats • {bookedCount} already booked</div>
        </div>
        <LadiesLegend />
      </div>

      <SeatLayout seats={seats} selectedSeatIds={selectedIds} onToggle={toggleSeat} />

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">Your Selection</div>
            <div className="mt-2">
              {selectedSeats.length === 0 ? (
                <div className="text-sm font-bold text-slate-300">No seats selected yet.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(s => (
                    <span key={s.id} className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-black text-indigo-700">
                      {s.number} • {s.berth}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">Total</div>
            <div className="text-3xl font-black text-slate-900">₹{total}</div>
            <button
              type="button"
              onClick={handleContinue}
              className="mt-3 w-full md:w-auto px-10 py-3 rounded-2xl font-black bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition disabled:opacity-50"
              disabled={selectedSeats.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModule;

