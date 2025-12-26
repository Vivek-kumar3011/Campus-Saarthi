import React, { useState, useEffect, useRef } from 'react'; 
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-react';
import { getBotResponse } from '../utils/chatLogic';

const Chatbot = ({ onBack }) => {
  // 1. All State Definitions
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! I am your Campus Assistant. Ask me about mess, faculty, or clubs!' }
  ]);
  const [input, setInput] = useState(''); // Added this so the input field works
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // 2. Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 3. Message Handling Logic
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input; // Capture input before clearing
    setInput('');
    
    setIsTyping(true);

    // Simulate ChatGPT-like thinking delay
    setTimeout(() => {
      const response = getBotResponse(currentInput);
      const botMsg = { role: 'bot', content: response };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-[2.5rem] shadow-sm border-b border-slate-100">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 font-bold mb-4">
          <ArrowLeft size={20} /> Dashboard
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg">
            <Bot size={24} />
          </div>
          <h2 className="text-xl font-black text-slate-800">Campus Bot</h2>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-4 rounded-[1.5rem] shadow-sm text-sm font-medium ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          placeholder="Ask me anything..." 
          className="flex-1 p-4 bg-slate-100 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;