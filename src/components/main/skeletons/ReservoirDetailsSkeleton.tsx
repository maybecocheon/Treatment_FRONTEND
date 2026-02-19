'use client'

import { createPortal } from "react-dom";

export default function ReservoirDetailsSkeleton() {
  return createPortal(
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/60 rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* 헤더 영역 */}
        <div className="px-6 py-4 md:py-8 flex justify-between items-center bg-sky-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-7 w-48 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-slate-200/70 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse" />
        </div>

        {/* 메인 영역 */}
        <div className="p-4 md:p-6 bg-slate-50/30 space-y-4">
          
          {/* 요약 영역 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/80 p-6 rounded-3xl border border-slate-100 h-32 flex flex-col justify-between">
                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="flex items-end justify-between">
                  <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
                  <div className="h-6 w-12 bg-slate-200 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* 차트 영역 */}
          <div className="bg-white/80 rounded-4xl p-6 h-100 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-7 w-12 bg-slate-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
            {/* 차트 그래픽 */}
            <div className="flex-1 w-full bg-slate-100/50 rounded-2xl relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-around px-4">
                  {[...Array(6)].map((_, idx) => (
                    <div 
                      key={idx} 
                      className="w-12 bg-slate-200/50 rounded-t-lg animate-pulse" 
                      style={{ height: `${20 + Math.random() * 60}%` }} 
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}