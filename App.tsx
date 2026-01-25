import React, { useState, useEffect } from 'react';
import BookingFlow from './pages/BookingFlow';
import Schedule from './pages/Schedule';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'booking' | 'schedule'>('booking');
  const [user, setUser] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');

  // 1. Check if a user is already logged in on this browser
  useEffect(() => {
    const savedUser = localStorage.getItem('current_bus_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail) {
      // 2. Save the user session independently
      localStorage.setItem('current_bus_user', loginEmail);
      setUser(loginEmail);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('current_bus_user');
    setUser(null);
    window.location.reload(); // Refresh to clear states
  };

  // 3. SHOW LOGIN SCREEN IF NO USER FOUND
  if (!user) {
    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 italic">SleeperBus Pro</h1>
          <p className="text-slate-400 text-xs mb-8 font-bold uppercase tracking-widest">Independent User Login</p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black text-slate-400 ml-2 uppercase">Your Email</label>
              <input 
                type="email" 
                required
                placeholder="passenger@example.com" 
                className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all">
              Login & View Bookings
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 4. MAIN DASHBOARD (Only visible after login)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black italic">SleeperBus Pro</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-xs font-black items-center uppercase tracking-widest">
            <button onClick={() => setActiveTab('booking')} className={activeTab === 'booking' ? 'border-b-2 border-white pb-1' : 'text-indigo-200'}>Book Ticket</button>
            <button onClick={() => setActiveTab('schedule')} className={activeTab === 'schedule' ? 'border-b-2 border-white pb-1' : 'text-indigo-200'}>Bus Schedule</button>
            <div className="h-6 w-px bg-indigo-400 mx-2"></div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-indigo-100 opacity-60">LOGGED IN AS</span>
               <span className="text-white text-[11px] lowercase font-mono">{user}</span>
            </div>
            <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">Logout</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {activeTab === 'booking' ? (
          <BookingFlow updateHeader={() => {}} currentUser={user} />
        ) : (
          <Schedule onSelectBus={() => setActiveTab('booking')} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>&copy; 2026 SleeperBus Pro | Multi-User Independence Mode</p>
        </div>
      </footer>
    </div>
  );
};

export default App;