import React, { useState } from 'react';
import SeatSelectionModule from '../components/seat/SeatSelectionModule';
import { Seat } from '../components/seat/SeatTypes';

const SeatSelectionDemo = () => {
  const [selected, setSelected] = useState<Seat[]>([]);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-5xl mx-auto">
        <SeatSelectionModule onContinue={(s) => setSelected(s)} />
        <div className="mt-6 text-sm text-slate-600">
          Selected in this demo: <span className="font-bold">{selected.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionDemo;

