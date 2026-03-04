export default function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse p-2">
      {/* 1. 헤더 영역 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-muted/20 rounded-xl" />
          <div className="h-5 w-80 bg-card-border rounded-lg" />
        </div>

        <div className="glass p-3 rounded-4xl flex items-center gap-4 w-full md:w-auto shadow-sm">
          <div className="h-12 w-36 bg-card-border rounded-2xl flex-1 md:flex-none" />
          <div className="h-12 w-48 bg-card-border rounded-2xl" />
          <div className="h-12 w-12 bg-card-border rounded-2xl" />
        </div>
      </div>

      {/* 2. 요약 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass p-6 rounded-4xl flex items-center gap-5 min-h-30 shadow-sm">
            <div className="w-14 h-14 bg-muted/20 rounded-[1.25rem]" />
            <div className="space-y-3 flex-1">
              <div className="h-4 w-16 bg-card-border rounded" />
              <div className="h-8 w-24 bg-muted/20 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. 메인 차트 영역 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] flex flex-col gap-6 min-h-130 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-muted/20 rounded-xl" />
                <div className="h-8 w-40 bg-muted/20 rounded-lg" />
              </div>
              <div className="w-20 h-6 bg-card-border rounded-full" />
            </div>

            {/* 내부 그리드 및 차트 시뮬레이션 */}
            <div className="flex-1 w-full bg-card-border/20 rounded-3xl border border-card-border/50 relative p-6 flex items-end gap-3">
              {/* 배경 가로선 시뮬레이션 */}
              <div className="absolute inset-x-6 inset-y-10 flex flex-col justify-between opacity-30">
                {[1, 2, 3, 4, 5].map((line) => (
                  <div key={line} className="w-full h-px bg-card-border" />
                ))}
              </div>
            </div>

            {/* 차트 하단 라벨 영역 스켈레톤 */}
            <div className="flex justify-between px-2">
              <div className="h-4 w-12 bg-card-border rounded" />
              <div className="h-4 w-12 bg-card-border rounded" />
              <div className="h-4 w-12 bg-card-border rounded" />
              <div className="h-4 w-12 bg-card-border rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}