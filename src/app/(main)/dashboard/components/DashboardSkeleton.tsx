export function DashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-3 min-h-0 w-full animate-pulse">
      
      {/* 왼쪽 섹션 (col-span-8) */}
      <div className="lg:col-span-8 flex flex-col gap-2 lg:gap-3">
        
        {/* KPI Row Skeleton */}
        <div className="flex gap-3 h-32">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 bg-slate-200/50 rounded-4xl" />
          ))}
        </div>

        {/* Prediction Panel Skeleton */}
        <div className="flex-1 min-h-75 bg-slate-200/50 rounded-[2.5rem]" />

        {/* Pump Schedule Skeleton */}
        <div className="flex-1 min-h-75 bg-slate-200/50 rounded-[2.5rem]" />
      </div>

      {/* 오른쪽 섹션 (col-span-4) */}
      <div className="lg:col-span-4 flex flex-col gap-2 lg:gap-3">
        
        {/* Risk Event Skeleton */}
        <div className="flex-[1.4] min-h-87.5 bg-slate-200/50 rounded-[2.5rem]" />

        {/* Risk Detail Skeleton */}
        <div className="flex-1 min-h-62.5 bg-slate-200/50 rounded-[2.5rem]" />
      </div>

    </div>
  );
}