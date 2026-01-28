"use client"

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Clock, ChevronDown, X, Droplets, MenuIcon } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@/data/mockData"
import Menu from "./Menu";

export default function Header() {
  // 시간
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  // 프로필
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 모바일 반응형 메뉴
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 마운트 시 시간
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => { setTime(new Date()); }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 프로필 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 md:h-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 transition-all">
      <div className="max-w-600 mx-auto h-full flex items-center justify-between px-4 md:px-8">

        {/* 로고 영역 */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">FLOWISE</span>
          </Link>

          {/* 메뉴 */}
          <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>

        {/* 우측 유틸리티 영역 */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* 시간 표시: 어두운 배경에 맞는 스타일로 변경 */}
          <div className="hidden xl:flex items-center gap-2.5 text-slate-400 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tabular-nums">
              {mounted ? `${time?.toLocaleTimeString("ko-KR", { hour12: false })}` : "--:--:--"}
            </span>
          </div>

          {/* 프로필 섹션 */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              // hover 시 배경색을 white/10으로 변경
              className="flex items-center gap-3 hover:bg-white/5 p-1.5 md:pl-2 md:pr-4 rounded-2xl transition-all group"
            >
              {/* 아바타 배경을 파란색 계열로 포인트 부여 */}
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <User size={18} />
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{currentUser.role}</p>
                <p className="text-sm font-black text-white">{currentUser.nickname}</p>
              </div>
              <ChevronDown size={14} className={`text-slate-500 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {/* 프로필 드롭다운: 다크 테마 적용 */}
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

          {/* 모바일 메뉴 토글 버튼 색상 변경 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:bg-white/5 rounded-xl"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}