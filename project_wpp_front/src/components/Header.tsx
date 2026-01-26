
import React, { useState, useEffect } from 'react';
import { User, LogOut, Clock, ChevronDown, Settings, Shield } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 text-slate-500 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-bold tabular-nums">
            {currentTime.toLocaleDateString('ko-KR')} {currentTime.toLocaleTimeString('ko-KR', { hour12: false })}
          </span>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-4 hover:bg-slate-50 p-2 pr-4 rounded-2xl transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Administrator</p>
            <p className="text-sm font-black text-slate-800 leading-none">관리자님</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-[2rem] shadow-2xl py-4 z-[100] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-50 mb-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">System Admin</span>
              </div>
              <p className="text-base font-black text-slate-800">관리자님 (운영팀장)</p>
              <p className="text-xs text-slate-400 font-medium mt-1">ID: admin_flowise</p>
            </div>
            
            <div className="px-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-sm font-bold">
                <Settings className="w-4 h-4" />
                시스템 설정
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-bold"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
