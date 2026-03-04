'use client'

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Clock, ChevronDown, X, Droplets, MenuIcon, ClockAlert } from "lucide-react";
import Link from "next/link";
import Menu from "./Menu";
import { usePathname, useRouter } from "next/navigation";
import { useVirtualClock } from "@/hooks/useVirtualClock";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";
import { ThemeToggle } from "./ThemeToggle";
import dayjs from "dayjs";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 1. 시간
  const { time, addOneHour } = useVirtualClock();
  const [mounted, setMounted] = useState(false);

  // 2. 프로필
  const { profile, isLoading: isProfileLoading } = useUser();

  // 3. 로그아웃
  const { handleLogout, isLoading: isLoggingOut } = useLogout();

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 창 꺼짐
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 경로 변경 시 UI 닫기
  useEffect(() => {
    setShowProfile(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="h-20 backdrop-blur-xl sticky top-0 z-50 transition-all">
      <div className="glass max-w-8xl mx-auto h-full flex items-center justify-between px-4 md:px-8 border-glass-border">

        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tighter text-foreground">FLOWISE</span>
          </Link>
          <div ref={menuRef}>
            <Menu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>


        <div className="flex items-center gap-3 md:gap-6">
          <ThemeToggle />
          {/* 시간 섹션 */}
          <button
            onClick={addOneHour}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-card border border-card-border text-foreground rounded-xl text-xs font-bold hover:bg-white/40 dark:hover:bg-slate-800/60 transition-all active:scale-95 shadow-sm group"
          >
            <ClockAlert className="w-3.5 h-3.5 text-warning group-hover:animate-pulse" />
            <span>+1시간</span>
          </button>

          <div className="hidden xl:flex items-center gap-3 text-muted bg-muted/10 px-4 py-2 rounded-2xl border border-card-border">
            <Clock className="w-4 h-4 text-primary" />
            <div className="flex items-center leading-none gap-4">
              <span className="text-sm text-muted tabular-nums">
                {mounted && time ? dayjs(time.split(" ")[0]).subtract(1, "day").format("YYYY-MM-DD") : "0000-00-00"}
              </span>
              <span className="text-sm font-semibold text-foreground tabular-nums tracking-wider">
                {mounted && time ? time.split(" ")[1] : "00:00:00"}
              </span>
            </div>
          </div>

          {/* 프로필 섹션 */}
          {isProfileLoading ? (
            <ProfileSkeleton />
          ) : profile ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 hover:bg-muted/20 p-1.5 md:pl-2 md:pr-4 rounded-2xl transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 transition-transform">
                  <User size={18} />
                </div>
                <div className="text-left hidden sm:block leading-tight">
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">{profile.department}</p>
                  <p className="text-sm font-black text-foreground">{profile.alias}</p>
                </div>
                <ChevronDown size={14} className={`text-muted transition-transform ${showProfile ? "rotate-180" : ""}`} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-60 bg-card border border-card-border rounded-3xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-1 space-y-1">
                    <button
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold text-muted hover:bg-muted/10 hover:text-foreground rounded-xl transition-colors"
                      onClick={() => router.push("/setting")}
                    >
                      <User size={16} />
                      <span>프로필 설정</span>
                    </button>
                    <button
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold text-danger hover:bg-danger-bg rounded-xl transition-colors"
                      onClick={() => handleLogout(true)}
                      disabled={isLoggingOut}
                    >
                      <LogOut size={16} />
                      <span>{isLoggingOut ? "로그아웃 중..." : "로그아웃"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-muted">로그인이 필요합니다.</div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted hover:bg-muted/20 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}