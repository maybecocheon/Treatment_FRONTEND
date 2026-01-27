'use client'

import { useState, useEffect, useRef } from 'react';
import { User, LogOut, Clock, ChevronDown, Menu } from 'lucide-react';
import { currentUser } from '@/data/mockData'

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  // 왼쪽 상단 시간
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  // 오른쪽 상단 프로필
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 마운트 시 시간 설정
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => { setTime(new Date()); }, 1000);
    return () => clearInterval(timer);
  }, []);


  // 프로필 바깥 클릭 시 프로필 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="h-16 md:h-18 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2.5 text-slate-500 bg-slate-50/50 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl border border-slate-100">
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
          <span className="text-xs md:text-sm font-bold tabular-nums">
            {mounted
              ? `${time?.toLocaleDateString('ko-KR')} ${time?.toLocaleTimeString('ko-KR', { hour12: false })}`
              : '--:--:--'}
          </span>
        </div>
      </div>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setShowProfile(prev => !prev)}
          className="flex items-center gap-2 md:gap-4 hover:bg-slate-50 p-1.5 md:p-2 md:pr-4 rounded-full md:rounded-2xl transition-all group"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full md:rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center 
                          text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">{currentUser.role}</p>
            <p className="text-sm font-black text-slate-800 leading-none">{currentUser.nickname}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 hidden sm:block ${showProfile ? 'rotate-180' : ''}`} />
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-slate-200/50 p-2 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="sm:hidden px-4 py-3 border-b border-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{currentUser.nickname}</p>
                <p className="text-xs text-slate-500">{currentUser.role}</p>
              </div>
            </div>
            <div className="px-4 py-3 border-b border-gray-50 hidden sm:block">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User ID</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{currentUser.id}</p>
            </div>
            <div className="p-1">
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors">
                <User size={16} />
                <span>프로필 설정</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut size={16} />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
