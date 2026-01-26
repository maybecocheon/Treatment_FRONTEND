
import React from 'react';
import { Map, History, Lightbulb, Droplets } from 'lucide-react';
import { ViewType } from '@/types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  onLogoClick: () => void;
}

export default function Sidebar({ currentView, setView, onLogoClick }: SidebarProps) {
  const menuItems = [
    { id: 'MAP' as ViewType, label: '지도 기반 배수지 현황', icon: <Map className="w-5 h-5" /> },
    { id: 'HISTORY' as ViewType, label: '히스토리 뷰어', icon: <History className="w-5 h-5" /> },
    { id: 'DECISION' as ViewType, label: '의사결정 지원', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl">
      <div
        className="p-6 cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-3"
        onClick={onLogoClick}
      >
        <div className="bg-blue-500 p-1.5 rounded-lg">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">FLOWISE</h1>
      </div>

      <nav className="mt-8 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 ${currentView === item.id
              ? 'bg-blue-600 text-white border-r-4 border-blue-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 text-xs text-slate-500 border-t border-slate-800">
        © 2026 FLOWISE Project Team.
        <br />
        All rights reserved.
      </div>
    </div>
  );
}
