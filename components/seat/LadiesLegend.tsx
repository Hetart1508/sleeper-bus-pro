import React from 'react';

const LadiesLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-indigo-600" /> Available
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-indigo-200 border border-indigo-300" /> Selected
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-slate-300" /> Booked
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-fuchsia-600" /> Ladies
      </div>
    </div>
  );
};

export default LadiesLegend;

