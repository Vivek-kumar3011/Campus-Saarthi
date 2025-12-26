import React, { useState, useEffect } from 'react';
// Firebase Import
import { auth } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Components
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MessMenu from './components/MessMenu';
import Schedule from './components/Schedule';
import Notices from './components/Notices';
import Resources from './components/Resources';
import Opportunities from './components/Opportunities';
import Contacts from './components/Contacts';
import TaskManager from './components/TaskManager';
import LostFound from './components/LostFound';
import BuySell from './components/BuySell';
import Chatbot from './components/Chatbot';
import { Loader2 } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  // 1. Firebase Auth Listener: Monitors session persistence and verification status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only allow entry if user exists and has clicked the verification link in their email
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 2. Logout Logic: Signs out from Firebase and resets navigation
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActivePage('dashboard');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // 3. Global Loading Screen: Displayed while checking Firebase session
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold animate-pulse tracking-wide">
          Syncing Campus Session...
        </p>
      </div>
    );
  }

  // 4. Authentication Gate: If no verified user, show Auth screen
  if (!user) {
    return <Auth onLogin={() => {}} />; 
  }

  // 5. Navigation Router
  const renderPage = () => {
    switch (activePage) {
      case 'mess':
        return <MessMenu onBack={() => setActivePage('dashboard')} />;
      case 'schedule':
        return <Schedule onBack={() => setActivePage('dashboard')} />;
      case 'notices':
        return <Notices onBack={() => setActivePage('dashboard')} />;
      case 'resources':
        return <Resources onBack={() => setActivePage('dashboard')} />;
      case 'opportunities':
        return <Opportunities onBack={() => setActivePage('dashboard')} />;
      case 'contacts':
        return <Contacts onBack={() => setActivePage('dashboard')} />;
      case 'tasks':
        return <TaskManager onBack={() => setActivePage('dashboard')} />;
      case 'lostfound':
        return <LostFound onBack={() => setActivePage('dashboard')} />;
      case 'buysell':
        return <BuySell onBack={() => setActivePage('dashboard')} />;
      case 'chatbot':
        return <Chatbot onBack={() => setActivePage('dashboard')} />;
      default:
        return (
          <Dashboard 
            onLogout={handleLogout} 
            onFeatureClick={(id) => setActivePage(id)} 
            user={user} 
          />
        );
    }
  };

  return (
    <div className="app-container min-h-screen bg-[#F8FAFC]">
      {renderPage()}
    </div>
  );
}

export default App;