'use client'

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Clock, ChevronDown, X, Droplets, MenuIcon } from "lucide-react";
import Link from "next/link";
import Menu from "./Menu";
import { usePathname, useRouter } from "next/navigation";
import { useVirtualClock } from "@/hooks/useVirtualClock";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 로그아웃
  const { handleLogout, isLoading } = useLogout();

  // 시간
  const [mounted, setMounted] = useState(false);
  const { time } = useVirtualClock();

  // 프로필
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { profile, setProfile, loadProfile } = useUser();

  // 모바일 메뉴
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. 마운트 시 시간 설정
    setMounted(true);

    // 2. 프로필 불러오기
    const cached = localStorage.getItem("user_info");
    if (cached) {
      setProfile(JSON.parse(cached));
    }
    loadProfile();

    // 3. 프로필 외부 클릭 시 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 경로 변경 시 프로필 닫기
  useEffect(() => {
    setShowProfile(false);
  }, [pathname]);

  const handleClick = () => {
    handleLogout(true);
  };

  if (!profile) return <HeaderSkeleton />

  return (
    <header className="h-16 md:h-20 backdrop-blur-xl sticky top-0 z-50 transition-all">
      <div className="glass max-w-8xl mx-auto h-full flex items-center justify-between px-4 md:px-8">

        {/* 로고 영역 */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="bg-linear-to-br from-sky-400 to-blue-600 p-1.5 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">FLOWISE</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>

        {/* 우측 유틸리티 영역 */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* 시간 섹션 */}
          <div className="hidden xl:flex items-center gap-3 text-slate-500 bg-slate-100/50 px-4 py-2 rounded-2xl border border-slate-200/50">
            <Clock className="w-4 h-4 text-sky-500" />
            <div className="flex flex-col items-start leading-none gap-1">
              {/* 날짜 표시 */}
              <span className="text-[12px] text-slate-400 tabular-nums">
                {mounted && time ? time.split(" ")[0] : "0000-00-00"}
              </span>
              {/* 시간 표시 */}
              <span className="text-sm font-semibold text-slate-700 tabular-nums tracking-wider">
                {mounted && time ? time.split(" ")[1] : "00:00:00"}
              </span>
            </div>
          </div>

          {/* 프로필 섹션 */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 hover:bg-slate-100/80 p-1.5 md:pl-2 md:pr-4 rounded-2xl transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <User size={18} />
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <p className="text-[10px] text-sky-600 font-black uppercase tracking-widest">{profile.department}</p>
                <p className="text-sm font-black text-slate-800">{profile.alias}</p>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showProfile ? "rotate-180" : ""}`} />
            </button>

            {/* 프로필 드롭다운 */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-60 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/60 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-1 space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-colors"
                    onClick={() => router.push("/setting")}>
                    <User size={16} />
                    <span>프로필 설정</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    onClick={handleClick}
                    disabled={isLoading}>
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 토글 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}