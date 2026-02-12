'use client'

export default function WaterLevelPanelSkeleton() {
  const skeletonRow = Array(4).fill(0);

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col min-h-0 overflow-hidden">
      {/* 타이틀 영역 스켈레톤 */}
      <div className="h-4 w-32 bg-slate-200 rounded-md animate-pulse mb-8 shrink-0" />
      
      <div className="flex-1 relative flex flex-col justify-start items-center pt-2 gap-4">
        
        {/* 1. 정수장 섹션 스켈레톤 */}
        <div className="relative z-10 mb-6 flex flex-col items-center">
          <div className="w-14 h-14 bg-slate-200 rounded-full animate-pulse shadow-sm border-2 border-slate-100" />
          <div className="mt-2 h-3 w-16 bg-slate-200 rounded-full animate-pulse" />
        </div>

        {/* 2. 배수지 행 섹션 스켈레톤 */}
        <div className="w-full flex flex-col gap-4">
          
          {/* 첫 번째 행 */}
          <div className="flex justify-center gap-2 w-full">
            {skeletonRow.map((_, i) => (
              <div key={`row1-${i}`} className="flex-1 max-w-30">
                <div className="w-full h-19 rounded-2xl bg-slate-100/50 border-2 border-slate-100 animate-pulse" />
              </div>
            ))}
          </div>

          {/* 두 번째 행 */}
          <div className="flex justify-center gap-2 w-full">
            {skeletonRow.map((_, i) => (
              <div key={`row1-${i}`} className="flex-1 max-w-30">
                <div className="w-full h-19 rounded-2xl bg-slate-100/50 border-2 border-slate-100 animate-pulse" />
              </div>
            ))}
          </div>

          {/* 세 번째 행 */}
          <div className="flex justify-center gap-2 w-full">
            {skeletonRow.map((_, i) => (
              <div key={`row1-${i}`} className="flex-1 max-w-30">
                <div className="w-full h-19 rounded-2xl bg-slate-100/50 border-2 border-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}