'use client'

export default function PumpSchedulePanelSkeleton() {
  return (
    <div className="flex-1 animate-pulse">
      {/* 메인 컨테이너 */}
      <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col border border-slate-100">
        
        {/* 상단 헤더 타이틀 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-slate-200 rounded-xl w-7 h-7" /> {/* 아이콘 박스 */}
          <div className="h-4 w-32 bg-slate-200 rounded-md" /> {/* 텍스트 */}
        </div>

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-4 min-h-0">
          
          {/* 차트 섹션 스켈레톤 (2컬럼 차지) */}
          <div className="h-70 md:h-full lg:col-span-2 min-h-0 relative py-2">
            <div className="w-full h-full bg-slate-100 rounded-2xl border border-slate-200/50" />
          </div>

          {/* 인포 섹션 스켈레톤 (1컬럼 차지) */}
          <div className="flex flex-col gap-2 min-h-0 shrink-0">
            <div className="rounded-[2.5rem] p-6 flex flex-col gap-5 h-full">
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col gap-4">
                
                {/* 시뮬레이션 타이틀 영역 */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 rounded-xl w-9 h-9" />
                  <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                </div>

                {/* 리스트 아이템 스켈레톤 (3개) */}
                <div className="space-y-2 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                      <div className="w-4 h-4 bg-slate-200 rounded-full mt-0.5" /> {/* 체크 아이콘 */}
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 bg-slate-200 rounded" />
                        <div className="h-2 w-full bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}