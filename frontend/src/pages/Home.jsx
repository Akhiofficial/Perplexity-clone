import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Compass, 
  Library, 
  Settings, 
  UserCircle, 
  ArrowRight,
  Globe,
  Zap,
  Layout,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: <Search size={20} />, label: 'Home', active: true },
    { icon: <Compass size={20} />, label: 'Discover', active: false },
    { icon: <Library size={20} />, label: 'Library', active: false },
  ];

  const categories = [
    { icon: <Globe size={18} />, label: 'Deep Search' },
    { icon: <Zap size={18} />, label: 'Fast' },
    { icon: <Layout size={18} />, label: 'Structured' },
    { icon: <MessageSquare size={18} />, label: 'Discussion' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#050608] text-gray-300 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-gray-900 flex flex-col p-6 space-y-8 bg-[#08090b]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/10">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AI Insights</span>
        </div>

        <button className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/10 group">
          <span className="flex items-center gap-2.5 font-semibold text-[14px]">
            <Plus size={18} /> New Thread
          </span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity">CTRL I</span>
        </button>

        <nav className="flex-1 space-y-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-xl transition-all font-medium text-[15px] ${
                item.active 
                ? 'bg-blue-600/10 text-blue-500' 
                : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800/30'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="space-y-4 pt-6 border-t border-gray-900">
          <button className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-gray-200 hover:bg-gray-800/30 transition-all font-medium text-[15px]">
            <Settings size={20} />
            Settings
          </button>
          <div className="flex items-center gap-3 px-4 py-2 mt-auto cursor-pointer hover:opacity-80 transition-opacity">
            <UserCircle size={32} className="text-gray-600" />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-white">John Doe</span>
              <span className="text-[11px] font-bold text-gray-600 tracking-wider">PREMIUM</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 md:px-20 lg:px-40">
        <div className="w-full max-w-[800px] mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="mb-12 text-left">
            <h1 className="text-[56px] md:text-[80px] font-bold text-white tracking-tighter leading-[1.05] mb-6">
              Ask anything.
            </h1>
            <p className="text-gray-500 text-[20px] max-w-[500px] leading-relaxed">
              Explore the frontiers of knowledge with our advanced AI search engine.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="relative group/search">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[24px] blur opacity-10 group-focus-within/search:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col bg-[#0d0f14] border border-gray-800 rounded-[24px] overflow-hidden focus-within:border-blue-500/50 shadow-2xl transition-all">
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="How does quantum entanglement work?"
                className="w-full bg-transparent p-6 pb-2 text-white placeholder:text-gray-700 resize-none min-h-[140px] focus:outline-none text-[18px] leading-relaxed"
              />
              
              <div className="flex items-center justify-between p-4 px-6 bg-black/20 border-t border-gray-900/50">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-[13px] font-semibold text-gray-400 hover:text-white transition-all">
                    <Layout size={14} /> Focus
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-[13px] font-semibold text-gray-400 hover:text-white transition-all">
                    <Plus size={14} /> File
                  </button>
                </div>

                <button 
                  disabled={!searchQuery.trim()}
                  className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${
                    searchQuery.trim() 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 active:scale-95' 
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <ArrowRight size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Categories/Suggestions */}
          <div className="mt-12 flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 text-gray-500 hover:text-white transition-all font-medium text-[14px]"
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Footer info */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[11px] font-bold tracking-[0.25em] text-gray-600">
            POWERED BY ADVANCED NEURAL NETWORKS
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
