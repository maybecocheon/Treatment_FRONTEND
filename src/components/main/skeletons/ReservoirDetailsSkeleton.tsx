export default function ReservoirDetailSkeleton() {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col gap-6">

        {/* 요약 정보 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass p-5 rounded-4xl border-card-border h-28 flex flex-col justify-between">
            <div className="h-3 w-20 bg-card-border rounded" />
            <div className="h-8 w-24 bg-muted/20 rounded-xl" />
          </div>
          <div className="glass p-5 rounded-4xl border-card-border h-28 flex flex-col justify-between">
            <div className="h-3 w-24 bg-card-border rounded" />
            <div className="h-8 w-full bg-card-border rounded-xl max-w-30" />
          </div>
        </div>

        {/* 메인 차트 영역 스켈레톤 */}
        <div className="flex-1 glass rounded-4xl p-6 flex flex-col min-h-75">
          <div className="flex justify-between items-center mb-10">
            <div className="h-5 w-36 bg-muted/20 rounded-lg" />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-7 w-10 bg-card-border rounded-xl" />
              ))}
            </div>
          </div>

          {/* 차트 가상 가이드라인 */}
          <div className="flex-1 flex flex-col justify-between relative">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-px bg-card-border/30" />
            ))}

            {/* 하단 데이터 바 시뮬레이션 */}
            <div className="absolute inset-0 flex items-end px-2 gap-2 pb-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-card-border/50 rounded-t-md transition-all duration-1000"
                  style={{ height: `${20 + (i * 5) % 50}%` }}
                />
              ))}
            </div>
          </div>

          {/* 차트 하단 라벨 가상 */}
          <div className="flex justify-between mt-2 px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-2 w-6 bg-card-border rounded" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}