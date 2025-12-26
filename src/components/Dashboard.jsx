import React from 'react'; 
import { 
  Utensils, Calendar, Bell, BookOpen, Briefcase, 
  Phone, CheckSquare, Search, ShoppingBag, MessageSquare,
  User, ChevronRight, LogOut
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
  >
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-opacity-20`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-bold text-slate-800 text-lg mb-1">{title}</h3>
    <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2">{description}</p>
    <div className="mt-4 flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-wider">
      Open Feature <ChevronRight size={14} className="ml-1" />
    </div>
  </div>
);

const Dashboard = ({ onLogout, onFeatureClick, user }) => {
  
  // Extract the user's first name from the Firebase profile
  const displayFirstName = user?.displayName ? user.displayName.split(' ')[0] : "Scholar";

  const features = [
    { id: 'mess', title: "Mess Menu", icon: Utensils, color: "bg-orange-500", description: "Today's Special: Check the latest updates." },
    { id: 'schedule', title: "Class Schedule", icon: Calendar, color: "bg-blue-600", description: "View your personal weekly timetable." },
    { id: 'notices', title: "Notices & Events", icon: Bell, color: "bg-red-500", description: "Stay updated with campus announcements." },
    { id: 'resources', title: "Academic Hub", icon: BookOpen, color: "bg-emerald-500", description: "Access PYQs, notes, and study material." },
    { id: 'opportunities', title: "Opportunities", icon: Briefcase, color: "bg-purple-500", description: "Latest internships and career placements." },
    { id: 'contacts', title: "Campus Directory", icon: Phone, color: "bg-cyan-500", description: "Important faculty and emergency contacts." },
    { id: 'tasks', title: "Task Manager", icon: CheckSquare, color: "bg-indigo-500", description: "Organize your assignments and deadlines." },
    { id: 'lostfound', title: "Lost & Found", icon: Search, color: "bg-amber-500", description: "Report or claim missing campus items." },
    { id: 'buysell', title: "Buy & Sell", icon: ShoppingBag, color: "bg-pink-500", description: "Marketplace for campus essentials." },
    { id: 'chatbot', title: "AI Saarthi", icon: MessageSquare, color: "bg-slate-800", description: "Ask anything about your campus life." },
  ];

  return (
    <div className="min-h-screen pb-32 bg-[#F8FAFC]">
      {/* Dashboard Header */}
      <header className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex justify-between items-end">
          <div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Campus Saarthi
            </span>
            <h1 className="text-4xl font-black mt-3 tracking-tight text-slate-800">
              Hello, <span className="text-blue-600">{displayFirstName}!</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onLogout}
              className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors flex items-center gap-2 font-bold text-[10px] uppercase shadow-sm active:scale-95"
            >
              <LogOut size={18} /> Logout
            </button>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 border-2 border-white overflow-hidden">
               {/* Use student's photo if available, otherwise show icon */}
               {user?.photoURL ? (
                <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" />
               ) : (
                <User size={24} className="text-white" />
               )}
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-black mb-6 px-2 text-slate-800 flex items-center gap-2">
          Campus Services <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-pulse"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((item) => (
            <FeatureCard 
              key={item.id}
              {...item}
              onClick={() => onFeatureClick(item.id)} 
            />
          ))}
        </div>
      </main>

      {/* Floating Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-slate-900/95 backdrop-blur-xl text-white px-8 py-4 rounded-[2.5rem] shadow-2xl flex justify-between items-center border border-white/10 z-40">
        <Calendar 
          size={20} 
          className="text-blue-400 cursor-pointer hover:scale-110 transition-transform" 
          onClick={() => onFeatureClick('schedule')} 
        />
        <Search 
          size={20} 
          className="opacity-50 cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => onFeatureClick('lostfound')} 
        />
        
        {/* Centralized AI Trigger */}
        <div className="relative -mt-16">
            <button 
              onClick={() => onFeatureClick('chatbot')}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-[6px] border-[#F8FAFC] hover:scale-110 active:scale-90 transition-all"
            >
                <MessageSquare size={28} className="text-white fill-current" />
            </button>
        </div>
        
        <Bell 
          size={20} 
          className="opacity-50 cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => onFeatureClick('notices')} 
        />
        <ShoppingBag 
          size={20} 
          className="opacity-50 cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => onFeatureClick('buysell')} 
        />
      </nav>
    </div>
  );
};

export default Dashboard;
