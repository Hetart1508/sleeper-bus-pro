import React, { useState, useEffect, useMemo } from 'react';

// 1. DATA CONSTANTS
const STATIONS = [
  { id: 's1', name: 'Ahmedabad (Gita Mandir)', time: '21:00', km: 0 },
  { id: 's2', name: 'Ahmedabad (CTM)', time: '21:30', km: 15 },
  { id: 's3', name: 'Vadodara', time: '23:15', km: 115 },
  { id: 's4', name: 'Bharuch', time: '00:30', km: 190 },
  { id: 's5', name: 'Surat', time: '01:45', km: 265 },
  { id: 's6', name: 'Vapi', time: '03:30', km: 380 },
  { id: 's7', name: 'Valsad', time: '04:00', km: 410 },
  { id: 's8', name: 'Mumbai (Borivali)', time: '06:00', km: 510 },
  { id: 's9', name: 'Mumbai (Andheri)', time: '06:45', km: 525 },
  { id: 's10', name: 'Mumbai (Central)', time: '07:30', km: 540 },
];

const MEAL_OPTIONS = [
  { id: 'm1', name: 'Gujarati Thali', price: 180 },
  { id: 'm2', name: 'Executive Meal', price: 280 },
  { id: 'm3', name: 'Quick Snacks', price: 120 },
];

interface BookingFlowProps {
  updateHeader: (route: { from: string; to: string }) => void;
  currentUser: string;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ updateHeader, currentUser }) => {
  // 2. STATES
  const [boardingIdx, setBoardingIdx] = useState<number>(0);
  const [droppingIdx, setDroppingIdx] = useState<number>(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatGenders, setSeatGenders] = useState<Record<string, string>>({});
  const [mealQuantities, setMealQuantities] = useState<Record<string, number>>({ m1: 0, m2: 0, m3: 0 });
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [ticketHistory, setTicketHistory] = useState<any[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [ticketID, setTicketID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({ phone: '' });

  // 3. PRICING LOGIC (₹2 per KM + ₹150 Base = ₹350 for AMD-VAD)
  const pricingData = useMemo(() => {
    const distance = STATIONS[droppingIdx].km - STATIONS[boardingIdx].km;
    const perSeatFare = 150 + (distance * 2);
    return { perSeatFare, distance };
  }, [boardingIdx, droppingIdx]);

  const totalMealPrice = (180 * (mealQuantities.m1 || 0)) + (280 * (mealQuantities.m2 || 0)) + (120 * (mealQuantities.m3 || 0));
  const totalPrice = (selectedSeats.length * pricingData.perSeatFare) + totalMealPrice;

  // 4. PERSISTENCE & SYNC
  useEffect(() => {
    const globalBooked = JSON.parse(localStorage.getItem('sleeperbus_booked_seats') || '[]');
    setBookedSeats(globalBooked);
    const userHistory = JSON.parse(localStorage.getItem(`history_${currentUser}`) || '[]');
    setTicketHistory(userHistory);
  }, [currentUser]);

  useEffect(() => {
    updateHeader({
      from: STATIONS[boardingIdx].name.split(' (')[0],
      to: STATIONS[droppingIdx].name.split(' (')[0]
    });
  }, [boardingIdx, droppingIdx, updateHeader]);

  // 5. DOWNLOAD .TXT TICKET FUNCTION
  const downloadTicketFile = () => {
    const content = `
========================================
       SLEEPERBUS PRO E-TICKET
========================================
Ticket ID    : ${ticketID}
Passenger    : ${currentUser}
Phone        : ${contactInfo.phone}
----------------------------------------
From         : ${STATIONS[boardingIdx].name}
To           : ${STATIONS[droppingIdx].name}
Departure    : ${STATIONS[boardingIdx].time}
----------------------------------------
Seats        : ${selectedSeats.join(', ')}
Genders      : ${selectedSeats.map(s => `${s}(${seatGenders[s]})`).join(', ')}
Total Paid   : ₹${totalPrice}
----------------------------------------
Wishing you a safe and comfortable journey!
========================================`.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SleeperBus_Ticket_${ticketID}.txt`;
    link.click();
  };

  const toggleSeat = (id: string) => {
    if (bookedSeats.includes(id)) return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(prev => prev.filter(s => s !== id));
      const newGenders = { ...seatGenders };
      delete newGenders[id];
      setSeatGenders(newGenders);
    } else {
      setSelectedSeats(prev => [...prev, id]);
      setSeatGenders(prev => ({ ...prev, [id]: 'Male' }));
    }
  };

  const handleFinalConfirm = () => {
    if (!contactInfo.phone) return alert("Enter mobile number!");
    const generatedID = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    const updatedGlobal = [...bookedSeats, ...selectedSeats];
    localStorage.setItem('sleeperbus_booked_seats', JSON.stringify(updatedGlobal));
    
    const userHistory = JSON.parse(localStorage.getItem(`history_${currentUser}`) || '[]');
    localStorage.setItem(`history_${currentUser}`, JSON.stringify([...userHistory, { id: generatedID, seats: selectedSeats, price: totalPrice }]));
    
    setTicketID(generatedID);
    setBookedSeats(updatedGlobal);
    setShowModal(false);
    setIsBooked(true);
  };

  const renderBusDeck = (prefix: string) => (
    <div className="bg-slate-100 p-4 rounded-[2rem] border-x-8 border-slate-300 shadow-inner flex-1">
      {[1, 2, 3, 4].map(row => (
        <div key={row} className="flex justify-between items-center gap-4 mb-3">
          {['A', 'B', 'C'].map((col, idx) => {
            const seatId = `${prefix}${row}${col}`;
            const isTaken = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);
            return (
              <React.Fragment key={seatId}>
                {idx === 1 && <div className="w-4 border-r-2 border-slate-200 border-dashed h-10"></div>}
                <button disabled={isTaken} onClick={() => toggleSeat(seatId)} 
                  className={`h-14 rounded-lg border-2 font-bold transition-all flex-1 text-xs
                    ${isTaken ? 'bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed' : 
                      isSelected ? (seatGenders[seatId] === 'Female' ? 'bg-pink-500 border-pink-600 text-white' : 'bg-indigo-600 border-indigo-700 text-white') : 
                      'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'}`}>
                  {isTaken ? 'X' : seatId}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );

  if (isBooked) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border mt-10">
        <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">Booking Confirmed!</h3>
        <button onClick={downloadTicketFile} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg mb-4 flex items-center justify-center gap-2">
           Download .txt Ticket
        </button>
        <button onClick={() => window.location.reload()} className="text-slate-400 font-bold text-sm block w-full text-center">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-black text-xs uppercase text-slate-400 mb-4 tracking-widest">Passenger List (Gender)</h3>
          {selectedSeats.length > 0 ? (
            <div className="space-y-2">
              {selectedSeats.map(seat => (
                <div key={seat} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                  <span className="text-xs font-bold">{seat}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setSeatGenders({...seatGenders, [seat]: 'Male'})} className={`px-2 py-1 text-[10px] rounded font-bold ${seatGenders[seat] === 'Male' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>M</button>
                    <button onClick={() => setSeatGenders({...seatGenders, [seat]: 'Female'})} className={`px-2 py-1 text-[10px] rounded font-bold ${seatGenders[seat] === 'Female' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>F</button>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-xs text-slate-300 italic">Select seats to assign gender</p>}
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-black text-xs uppercase text-slate-400 mb-4 tracking-widest">Route Selection</h3>
          <div className="space-y-4">
            <select value={boardingIdx} onChange={(e) => setBoardingIdx(parseInt(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl text-sm font-bold">
              {STATIONS.slice(0, -1).map((s, i) => <option key={s.id} value={i}>{s.name}</option>)}
            </select>
            <select value={droppingIdx} onChange={(e) => setDroppingIdx(parseInt(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl text-sm font-bold">
              {STATIONS.map((s, i) => (
                <option key={s.id} value={i} disabled={i <= boardingIdx}>{s.name}</option>
              ))}
            </select>
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex justify-between items-center">
               <span className="text-[10px] font-bold text-indigo-600 uppercase">Fare per Seat</span>
               <span className="text-sm font-black text-indigo-700">₹{pricingData.perSeatFare}</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-black text-xs uppercase text-slate-400 mb-4 tracking-widest text-left">Journey Meals</h3>
          {MEAL_OPTIONS.map(meal => (
            <div key={meal.id} className="flex justify-between items-center mb-3 p-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-bold text-slate-700">{meal.name}</span>
              <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-lg border">
                <button onClick={() => setMealQuantities({...mealQuantities, [meal.id]: Math.max(0, (mealQuantities[meal.id] || 0) - 1)})} className="font-bold text-indigo-600">-</button>
                <span className="text-sm font-bold">{mealQuantities[meal.id] || 0}</span>
                <button onClick={() => setMealQuantities({...mealQuantities, [meal.id]: (mealQuantities[meal.id] || 0) + 1})} className="font-bold text-indigo-600">+</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="lg:col-span-8 bg-white p-8 rounded-2xl border shadow-sm flex flex-col">
        <h3 className="text-xl font-black text-slate-800 mb-8 italic">Sleeper Bus (2+1 Layout)</h3>
        <div className="flex flex-col xl:flex-row gap-8 mb-8 justify-center">
          {renderBusDeck("L")}
          {renderBusDeck("U")}
        </div>
        <div className="flex gap-4 justify-center py-4 border-t border-slate-50 mb-4">
           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 bg-indigo-600 rounded"></div> MALE</div>
           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 bg-pink-500 rounded"></div> FEMALE</div>
           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 bg-slate-300 rounded"></div> BOOKED</div>
        </div>
        <div className="mt-auto pt-6 border-t flex justify-between items-center">
          <div><p className="text-xs text-slate-400 font-bold uppercase">Total Payable</p><h4 className="text-4xl font-black text-slate-900">₹{totalPrice}</h4></div>
          <button onClick={() => setShowModal(true)} disabled={selectedSeats.length === 0} className="px-12 py-5 rounded-2xl font-black bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 active:scale-95 transition-all">Review & Pay</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-black mb-6 text-center text-slate-800 tracking-tight">Final Confirmation</h3>
            <input type="tel" placeholder="Mobile Number" value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none border-slate-200 mb-6" />
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 font-bold text-slate-400">Cancel</button>
              <button onClick={handleFinalConfirm} className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg">Confirm & Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;