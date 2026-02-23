'use client'

export default function ReservoirModalSkeleton() {
  return (
    <div className="h-full p-4 md:p-6 space-y-4 bg-slate-200/50">
      {/* 요약 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="glass p-6 rounded-3xl h-32 flex flex-col justify-between">
            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="flex items-end justify-between">
              <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-6 w-12 bg-slate-200 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="glass rounded-3xl p-6 h-130 flex flex-col">
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
  );
}