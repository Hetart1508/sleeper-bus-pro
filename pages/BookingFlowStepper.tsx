import React, { useState } from 'react';
import SeatSelectionModule from '../components/seat/SeatSelectionModule';
import { Seat } from '../components/seat/SeatTypes';

type Step = 'SEAT' | 'MEAL' | 'PASSENGER' | 'PAYMENT' | 'CONFIRM';

const BookingFlowStepper = ({ currentUser }: { currentUser: string }) => {
  const [step, setStep] = useState<Step>('SEAT');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const canContinue = selectedSeats.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                SleeperBus Pro
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                Booking (Stepper)
              </h1>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Logged in as
              </div>
              <div className="text-sm font-mono font-black text-slate-700 truncate max-w-[160px] md:max-w-[240px]">
                {currentUser}
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              {['SEAT', 'MEAL', 'PASSENGER', 'PAYMENT', 'CONFIRM'].map((s) => {
                const active = step === s;
                const done =
                  ['SEAT', 'MEAL', 'PASSENGER', 'PAYMENT', 'CONFIRM'].indexOf(step) >
                  ['SEAT', 'MEAL', 'PASSENGER', 'PAYMENT', 'CONFIRM'].indexOf(s);

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      if (s === 'SEAT') setStep('SEAT');
                      if (s === 'MEAL' && canContinue) setStep('MEAL');
                      if (s === 'PASSENGER' && canContinue) setStep('PASSENGER');
                      if (s === 'PAYMENT' && canContinue) setStep('PAYMENT');
                      if (s === 'CONFIRM' && canContinue) setStep('CONFIRM');
                    }}
                    className={`px-3 py-2 rounded-xl border transition-all ${
                      active
                        ? 'bg-indigo-600 border-indigo-700 text-white shadow'
                        : done
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {step === 'SEAT' && (
          <SeatSelectionModule
            onContinue={(seats) => {
              setSelectedSeats(seats);
              setStep('MEAL');
            }}
          />
        )}

        {step !== 'SEAT' && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
            <div className="text-lg font-black text-slate-900">Next step UI placeholder</div>
            <div className="text-sm font-bold text-slate-500 mt-2">
              (Implementing full stepper soon: Meals → Passenger → Payment → Confirmation)
            </div>
            <div className="mt-4 text-xs text-slate-400 font-bold">
              Seats selected: {selectedSeats.length}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep('SEAT')}
                className="px-6 py-3 rounded-2xl font-black bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep('CONFIRM')}
                className="px-6 py-3 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Go to Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlowStepper;

