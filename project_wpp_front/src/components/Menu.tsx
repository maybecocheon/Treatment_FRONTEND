"use client"

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, BrainCircuit, ChevronRight } from "lucide-react";

interface MenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Menu({ isMobileMenuOpen, setIsMobileMenuOpen }: MenuProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: '지도 기반 현황', path: '/map', icon: <LayoutDashboard size={18} /> },
    { name: '히스토리 뷰어', path: '/history', icon: <History size={18} /> },
    { name: '의사결정 지원', path: '/scheduling', icon: <BrainCircuit size={18} /> },
  ];

  return (
    <>
      {/* 1. 데스크탑 네비게이션 */}
      <nav className="hidden lg:flex items-center gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive(item.path)
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' // 활성화 시 파란색 포인트
                : 'text-slate-400 hover:text-white hover:bg-white/5'   // 비활성 시 은은한 화이트
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* 2. 모바일 네비게이션 (오버레이 드롭다운) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all ${
                  isActive(item.path) 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'bg-white/5 text-slate-400 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-base">{item.name}</span>
                </div>
                {isActive(item.path) && <ChevronRight size={18} className="opacity-70" />}
              </Link>
            ))}
          </nav>
          
          {/* 모바일 메뉴 하단 추가 정보 (선택 사항) */}
          <div className="mt-6 px-5 py-4 border-t border-white/5">
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Flowise Intelligence System</p>
          </div>
        </div>
      )}
    </>
  );
}