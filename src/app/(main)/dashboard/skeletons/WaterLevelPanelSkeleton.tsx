'use client'

export default function WaterLevelPanelSkeleton() {
  const skeletonCards = Array.from({ length: 12 });

  return (
    <div className="glass rounded-2xl p-4 lg:p-6 flex flex-col relative overflow-hidden animate-pulse">
      {/* 제목 스켈레톤 */}
      <div className="h-5 w-24 bg-slate-200 rounded-md mb-6" />

      {/* SVG 선 스켈레톤 */}
      <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%' }}>
        <path 
          d="M 50% 120 L 50% 160" 
          stroke="#e2e8f0" 
          strokeWidth="2" 
          strokeDasharray="4 4" 
          className="opacity-50"
        />
      </svg>

      <div className="flex-1 flex flex-col gap-4 items-center relative z-10">
        
        {/* 1. 정수장 섹션 스켈레톤 */}
        <div className="mb-10 flex flex-col items-center shrink-0">
          <div className="bg-white/60 border-2 border-slate-200 p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-sm flex items-center gap-3 lg:gap-4 min-w-35 lg:min-w-40">
            <div className="bg-slate-200 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-slate-300 rounded" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-8 bg-slate-200 rounded" />
              <div className="h-5 w-16 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="mt-2 h-3 w-20 bg-slate-200 rounded" />
        </div>

        {/* 2. 배수지 섹션 그리드 스켈레톤 */}
        <div className="w-full flex flex-wrap justify-center gap-2 lg:gap-3 pb-2">
          {skeletonCards.map((_, i) => (
            <div 
              key={i} 
              className="w-36 h-20 bg-white/40 border-2 border-slate-100 rounded-xl lg:rounded-2xl flex flex-col items-center justify-center p-2 gap-2"
            >
              {/* 카드 내부 텍스트 라인 */}
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-5 w-10 bg-slate-200 rounded" />
              {/* 하단 게이지 바 스켈레톤 */}
              <div className="w-full h-1 bg-slate-100 rounded-full mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}