import React from 'react';
import { ArrowLeft, Utensils, Clock, Coffee, Sun, Cookie, Moon, Info } from 'lucide-react';

const MessMenu = ({ onBack }) => {
  // Your provided data
  const TIME_SLOTS = {
    "Breakfast": "(8:00 to 9:00)",
    "Lunch": "(1:00 to 2:00)",
    "Snacks": "(5:20 to 6:00)",
    "Dinner": "(8:00 to 9:00)"
  };

  const MESS_MENU = {
    "Monday": { "Breakfast": "Poha / Idli Sambhar (4pc)", "Lunch": "Veg Sabji + Rice + Roti + Papad", "Snacks": "Manchurian (4pc)", "Dinner": "Egg/Paneer do piaza + Rasgulla" },
    "Tuesday": { "Breakfast": "Corn Flakes + Milk", "Lunch": "Aloo Bhujia + Dal + Rice + Curd", "Snacks": "Maggi (original)", "Dinner": "Sattu Paratha + Aloo Dum + Sewai" },
    "Wednesday": { "Breakfast": "Chowmien + Ketchup", "Lunch": "Lawki Chana + Dal + Rice", "Snacks": "Samosa (2pc) + Ghogni", "Dinner": "Chicken (3pc) / Paneer Bhurji + Rasgulla" },
    "Thursday": { "Breakfast": "Sprouts + Suji Halwa", "Lunch": "Veg Sabji + Rice + Dal + Chips", "Snacks": "Aloo/Onion Pakora", "Dinner": "Jeera Rice + Dal Fry + Chum Chum" },
    "Friday": { "Breakfast": "Puri (4pc) + Ghugni", "Lunch": "Aloo Bhujia + Dal + Rice + Curd", "Snacks": "Sprouts + Banana", "Dinner": "Omelette / Kadai Paneer + Halwa" },
    "Saturday": { "Breakfast": "Pav Bhaji + Onion & Lemon", "Lunch": "Kala chana + Masala Rice + Dal", "Snacks": "Aloo Tikki Burger", "Dinner": "Plane Paratha + Jeera Aloo + Kheer" },
    "Sunday": { "Breakfast": "Aloo Paratha (2pc) + Pickle", "Lunch": "Chicken (3pc) / Paneer Bhurji + Fried Rice", "Snacks": "Pani Puri (7pc)", "Dinner": "Khichdi / Veg Biryani + Suji Halwa" }
  };

  const mealIcons = {
    Breakfast: <Coffee size={18} className="text-orange-500" />,
    Lunch: <Sun size={18} className="text-yellow-500" />,
    Snacks: <Cookie size={18} className="text-amber-600" />,
    Dinner: <Moon size={18} className="text-indigo-500" />
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-bold mb-4 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Dashboard
        </button>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100">
            <Utensils className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-black text-slate-800">Weekly Menu</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {/* Notes Section */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
          <Info className="text-blue-500 shrink-0" size={20} />
          <p className="text-xs text-blue-800 font-medium">
            Tea, Biscuits & Banana served daily at Breakfast. Tea served at Snacks (except Sunday).
          </p>
        </div>

        {/* Weekly List */}
        {Object.entries(MESS_MENU).map(([day, meals]) => (
          <div key={day} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">{day}</h3>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(meals).map(([mealType, food]) => (
                <div key={mealType} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1">{mealIcons[mealType]}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-700">{mealType}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{TIME_SLOTS[mealType]}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5 leading-tight">{food}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessMenu;