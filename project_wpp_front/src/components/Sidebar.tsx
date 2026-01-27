'use client'

import { BrainCircuit, ChevronRight, Droplets, History, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: '지도 기반 배수지 현황', path: '/map', icon: <LayoutDashboard size={20} /> },
    { name: '히스토리 뷰어', path: '/history', icon: <History size={20} /> },
    { name: '의사결정 지원', path: '/decision', icon: <BrainCircuit size={20} /> },
  ];

  return (
    <>
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 p-2 rounded-xl transition-colors">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              FLOWISE
            </Link>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-transparent ${isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive(item.path) && <ChevronRight className="ml-auto opacity-50" size={16} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 bg-slate-950/50 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center font-medium">© 2026 FLOWISE System.</p>
        </div>
      </div>
    </>
  );
};
