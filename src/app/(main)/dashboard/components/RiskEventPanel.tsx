
import React from 'react';
import { RiskEvent } from '@/data/types';

interface Props {
  events: RiskEvent[];
}

export const RiskEventPanel: React.FC<Props> = ({ events }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-4 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-0">
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h2 className="text-xs lg:text-sm font-black text-slate-800 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          위험 탐지 로그
        </h2>
        <span className="text-[8px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 uppercase font-black tracking-widest">Live</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
        {events.map((event) => (
          <div key={event.id} className="bg-white/40 hover:bg-white/80 border border-white/80 rounded-xl p-3 transition-all duration-300 cursor-pointer group shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'Critical' ? 'bg-rose-500 shadow-sm' : 
                  event.status === 'Warning' ? 'bg-amber-500' : 'bg-sky-500'
                }`}></div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 leading-none">{event.reservoir}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">{event.type}</span>
                </div>
              </div>
              <div className="text-sm font-black text-slate-300 group-hover:text-slate-800 transition-colors">{event.score}</div>
            </div>
            <div className="mt-2">
              <p className="text-[10px] text-slate-600 font-medium leading-tight">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
           AI 추천 모드 <span className="font-bold text-sky-600 uppercase">On</span>
        </div>
        <button className="text-[9px] bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all font-bold shadow-md shadow-slate-200">History</button>
      </div>
    </div>
  );
};
