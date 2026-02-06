'use client'

export default function HeaderSkeleton() {
  return (
    <header className="h-16 md:h-20 backdrop-blur-xl sticky top-0 z-50 transition-all">
      <div className="glass max-w-8xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        
        {/* 로고 영역 스켈레톤 */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 animate-pulse">
            <div className="w-8 h-8 bg-slate-200 rounded-xl" />
            <div className="w-24 h-6 bg-slate-200 rounded-lg" />
          </div>

          {/* 메뉴 영역 스켈레톤 (데스크탑 전용) */}
          <div className="hidden lg:flex items-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-4 bg-slate-100 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* 우측 유틸리티 영역 스켈레톤 */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* 시간 섹션 스켈레톤 */}
          <div className="hidden xl:flex items-center gap-3 bg-slate-50/50 px-4 py-2 rounded-2xl border border-slate-100 animate-pulse">
            <div className="w-4 h-4 bg-slate-200 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <div className="w-16 h-2 bg-slate-100 rounded" />
              <div className="w-20 h-3 bg-slate-200 rounded" />
            </div>
          </div>

          {/* 프로필 섹션 스켈레톤 */}
          <div className="flex items-center gap-3 p-1.5 rounded-2xl animate-pulse">
            <div className="w-9 h-9 rounded-xl bg-slate-200" />
            <div className="hidden sm:flex flex-col gap-1.5">
              <div className="w-12 h-2 bg-slate-100 rounded" />
              <div className="w-16 h-3 bg-slate-200 rounded" />
            </div>
            <div className="w-3 h-3 bg-slate-100 rounded-full" />
          </div>
        </div>

      </div>
    </header>
  );
}