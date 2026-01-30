'use client'

// 개별 카드 스켈레톤 컴포넌트
const StatCardSkeleton = () => (
  <div className="glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center gap-4 overflow-hidden">
    {/* 아이콘 영역 스켈레톤 */}
    <div className="w-14 h-14 rounded-2xl bg-slate-200/50 animate-pulse" />
    
    <div className="flex flex-col items-center gap-3 w-full">
      {/* 라벨 영역 스켈레톤 */}
      <div className="h-3 w-20 bg-slate-200/50 rounded-full animate-pulse" />
      
      {/* 수치 및 단위 영역 스켈레톤 */}
      <div className="flex items-baseline gap-2 justify-center w-full">
        <div className="h-8 w-24 bg-slate-200/70 rounded-xl animate-pulse" />
        <div className="h-4 w-8 bg-slate-200/40 rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

export default function PlantStatsSkeleton() {
  return (
    <div className="flex flex-col justify-stretch gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full min-w-55">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}