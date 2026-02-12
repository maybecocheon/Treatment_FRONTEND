'use client'

import { X } from "lucide-react";

export default function ReservoirDetailsSkeleton() {
  return (
    <div className="flex flex-col h-full bg-slate-900/5 backdrop-blur-md overflow-hidden">
      
      {/* 1. 헤더 */}
      <div className="px-6 py-4 md:py-8 flex justify-between items-center bg-white/40 border-b border-white/20 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          {/* 아이콘 박스 */}
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/30 rounded-2xl animate-pulse border border-white/40 shadow-inner" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-white/40 rounded-md animate-pulse" />
            <div className="h-3 w-32 bg-white/20 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/20 animate-pulse">
          <X size={24} className="text-transparent" />
        </div>
      </div>

      {/* 2. 메인 바디 */}
      <div className="p-4 md:p-6 space-y-5 bg-linear-to-br from-white/10 to-transparent flex-1 overflow-hidden">
        
        {/* 요약 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/30 border border-white/40 backdrop-blur-md p-6 rounded-4xl h-32 flex flex-col justify-between shadow-lg shadow-black/5">
              <div className="h-3 w-24 bg-white/40 rounded animate-pulse" />
              <div className="flex items-end justify-between">
                <div className="h-10 w-32 bg-white/50 rounded-lg animate-pulse" />
                <div className="h-6 w-12 bg-white/20 rounded-full animate-pulse border border-white/20" />
              </div>
            </div>
          ))}
        </div>

        {/* 3. 메인 차트 영역 */}
        <div className="bg-white/40 border border-white/50 backdrop-blur-lg rounded-[2.5rem] p-6 h-105 flex flex-col shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-2">
            <div className="h-5 w-44 bg-white/50 rounded-md animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-8 w-14 bg-white/30 rounded-2xl animate-pulse border border-white/20" />
              ))}
            </div>
          </div>
          
          {/* 차트 내부 콘텐츠 영역 */}
          <div className="flex-1 w-full bg-white/10 rounded-3xl border border-white/10 flex items-end justify-between p-6 gap-3 shadow-inner">
            {[...Array(14)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-white/30 rounded-t-xl animate-pulse" 
                style={{ 
                    height: `${Math.random() * 60 + 20}%`, 
                    animationDelay: `${i * 0.1}s`,
                    boxShadow: "0 -2px 10px rgba(255,255,255,0.1)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}