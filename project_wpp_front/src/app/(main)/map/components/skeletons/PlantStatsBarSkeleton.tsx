'use client';

export default function PlantStatsBarSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="flex-1 min-w-50 bg-white border border-gray-100 p-4 rounded-2xl flex items-center space-x-4 animate-pulse"
        >
          {/* 아이콘 영역 스켈레톤 */}
          <div className="bg-slate-200 p-3 rounded-xl w-12 h-12" />
          
          <div className="space-y-2 flex-1">
            {/* 라벨 영역 */}
            <div className="h-3 bg-slate-200 rounded-full w-20" />
            {/* 수치 영역 */}
            <div className="h-7 bg-slate-200 rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}