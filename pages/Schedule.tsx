import React, { useState, useEffect } from 'react';

const BUS_SERVICES = [
  { id: 'B3', name: 'Night King Express', type: 'AC Sleeper', startTime: '09:00 PM' },
  { id: 'B4', name: 'Late Night Star', type: 'AC Sleeper', startTime: '10:00 PM' },
  { id: 'B5', name: 'Midnight Premium', type: 'AC Sleeper', startTime: '11:00 PM' },
];

const STATION_DATA: { [key: string]: any[] } = {
  'B3': [
    { stop: 'Ahmedabad', arr: '--', dep: '09:00 PM' },
    { stop: 'Vadodara', arr: '11:15 PM', dep: '11:30 PM' },
    { stop: 'Surat', arr: '01:45 AM', dep: '02:00 AM' },
    { stop: 'Mumbai', arr: '07:30 AM', dep: '--' },
  ],
  'B4': [
    { stop: 'Ahmedabad', arr: '--', dep: '10:00 PM' },
    { stop: 'Vadodara', arr: '12:15 AM', dep: '12:30 AM' },
    { stop: 'Surat', arr: '02:45 AM', dep: '03:00 AM' },
    { stop: 'Mumbai', arr: '08:30 AM', dep: '--' },
  ],
  'B5': [
    { stop: 'Ahmedabad', arr: '--', dep: '11:00 PM' },
    { stop: 'Vadodara', arr: '01:15 AM', dep: '01:30 AM' },
    { stop: 'Surat', arr: '03:45 AM', dep: '04:00 AM' },
    { stop: 'Mumbai', arr: '09:30 AM', dep: '--' },
  ],
};

const Schedule: React.FC<{ onSelectBus: (id: string) => void }> = ({ onSelectBus }) => {
  const [selectedBus, setSelectedBus] = useState(BUS_SERVICES[0]);
  const [speed, setSpeed] = useState(0);

  // Randomize speed between 0 and 80 km/h
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 81));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg">
          <p className="text-xs font-bold text-indigo-200 uppercase mb-1">Live Speed</p>
          <h4 className="text-4xl font-black">{speed} <span className="text-lg">km/h</span></h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Active Fleet</p>
          <h4 className="text-2xl font-black text-slate-800">{BUS_SERVICES.length} Buses Running</h4>
        </div>
      </div>

      <h3 className="text-xl font-black text-slate-800">Select a Service to View Arrival Times</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BUS_SERVICES.map((bus) => (
          <button
            key={bus.id}
            onClick={() => setSelectedBus(bus)}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              selectedBus.id === bus.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
            }`}
          >
            <h4 className="font-bold text-slate-800">{bus.name}</h4>
            <p className="text-sm text-indigo-600 font-bold">Departure: {bus.startTime}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
            <tr>
              <th className="px-8 py-4">Station</th>
              <th className="px-8 py-4">Arrival</th>
              <th className="px-8 py-4">Departure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {STATION_DATA[selectedBus.id].map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                <td className="px-8 py-4 font-bold text-slate-700">{item.stop}</td>
                <td className="px-8 py-4 text-sm font-mono text-slate-500">{item.arr}</td>
                <td className="px-8 py-4 text-sm font-mono text-slate-500">{item.dep}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 bg-slate-50 border-t flex justify-center">
          <button 
            onClick={() => onSelectBus(selectedBus.id)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Book This Bus ({selectedBus.startTime})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;