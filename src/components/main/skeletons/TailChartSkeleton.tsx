export default function TailChartSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-4 animate-pulse min-h-17">
      {/* 차트 본체 영역 */}
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 bg-card/50 rounded-2xl border border-card-border flex items-end p-6">
          {/* 차트 격자 느낌을 주기 위한 가로선들 */}
          <div className="w-full h-full flex flex-col justify-between pt-8 pb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-card-border/50" />
            ))}
          </div>

          {/* X축 라벨 스켈레톤 */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-around px-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 w-8 bg-card-border rounded" />
            ))}
          </div>

          {/* 좌우 Y축 라벨 스켈레톤 */}
          <div className="absolute left-1 top-10 bottom-10 flex flex-col justify-between">
            {[1, 2, 3].map((i) => <div key={i} className="h-2 w-6 bg-card-border rounded" />)}
          </div>
          <div className="absolute right-1 top-10 bottom-10 flex flex-col justify-between">
            {[1, 2, 3].map((i) => <div key={i} className="h-2 w-6 bg-card-border rounded" />)}
          </div>
        </div>
      </div>

      {/* 하단 범례(Legend) 영역 스켈레톤 */}
      <div className="flex items-center justify-center gap-6 h-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-card-border" />
            <div className="h-2 w-12 bg-card-border rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}