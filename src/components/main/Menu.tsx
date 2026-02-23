'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, ChevronRight, Factory, Map, LayoutDashboard } from "lucide-react";

interface MenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Menu({ isMobileMenuOpen, setIsMobileMenuOpen }: MenuProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path.split("/")[1]);

  const menuItems = [
    { name: "실시간 대시보드", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "지도", path: "/map", icon: <Map size={18} /> },
    { name: "스케줄링", path: "/scheduling", icon: <Factory size={18} /> },
    { name: "히스토리", path: "/history", icon: <History size={18} /> },
  ];

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <nav className="hidden lg:flex items-center gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive(item.path)
                ? "bg-sky-50 text-sky-600 shadow-sm shadow-sky-100"
                : "text-slate-500 hover:text-sky-500 hover:bg-slate-50"
              }`}
          >
            <span className={`${isActive(item.path) ? "text-sky-500" : "text-slate-400"}`}>
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* 모바일 네비게이션 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-100 p-4 shadow-2xl shadow-slate-200/50 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-3xl font-bold transition-all ${isActive(item.path)
                    ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30"
                    : "bg-slate-50 text-slate-500 border border-slate-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive(item.path) ? "text-white" : "text-sky-500"}`}>
                    {item.icon}
                  </span>
                  <span className="text-base">{item.name}</span>
                </div>
                {isActive(item.path) ? (
                  <ChevronRight size={18} className="text-white/70" />
                ) : (
                  <ChevronRight size={18} className="text-slate-300" />
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 px-5 py-4 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              FLOWISE System
            </p>
          </div>
        </div>
      )}
    </>
  );
}