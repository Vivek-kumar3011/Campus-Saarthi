import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, Building, Users, GraduationCap, AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { CONTACT_DATA, CONTACT_CATEGORIES } from '../data/contactData';

const Contacts = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('office');
  const [searchQuery, setSearchQuery] = useState('');

  // Map icon strings to Lucide components
  const iconMap = { Building, GraduationCap, Users };

  const getFilteredData = () => {
    const data = CONTACT_DATA[activeTab] || [];
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-[2.5rem] shadow-sm border-b border-slate-100">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-bold mb-6">
          <ArrowLeft size={20} /> Back
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-lg">
            <Phone size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">College Contacts</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or position..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-around p-4 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 mb-4 border-b border-slate-200">
        {CONTACT_CATEGORIES.map(tab => {
          const Icon = iconMap[tab.icon];
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && <div className="h-1 w-6 bg-blue-600 rounded-full mt-1" />}
            </button>
          );
        })}
      </div>

      <div className="max-w-xl mx-auto px-6 space-y-4">
        {/* Anti-Ragging Section */}
        <div className="bg-red-50 border border-red-100 p-5 rounded-[2rem] flex items-start gap-4">
          <AlertTriangle className="text-red-600 mt-1" size={24} />
          <div>
            <h4 className="font-black text-red-800 text-sm">Anti-Ragging Helpline</h4>
            <div className="flex gap-4 mt-2">
              <a href="tel:18001805522" className="text-xs font-bold text-red-600 underline">Call 1800-180-5522</a>
              <a href="mailto:helpline@antiragging.in" className="text-xs font-bold text-red-600 underline">Email Support</a>
            </div>
          </div>
        </div>

        {/* Dynamic List */}
        {getFilteredData().map((contact, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center group transition-all hover:border-blue-200">
            <div className="flex-1">
              <h3 className="font-black text-slate-800 leading-tight group-hover:text-blue-600">{contact.name}</h3>
              <p className="text-xs text-slate-400 font-bold mb-3">{contact.role}</p>
              <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 flex items-center gap-2 font-medium">
                <Mail size={14} className="text-blue-400" /> {contact.email}
              </a>
            </div>
            <a href={`mailto:${contact.email}`} className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;