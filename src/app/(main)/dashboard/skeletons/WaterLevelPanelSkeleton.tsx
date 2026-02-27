'use client'

interface WaterLevelPanelSkeletonProps {
  isSimulation?: boolean;
}

export default function WaterLevelPanelSkeleton({ isSimulation = false }: WaterLevelPanelSkeletonProps) {
  // 카드 6개씩 두 줄 생성을 위한 배열
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="h-full glass rounded-2xl p-5 flex flex-col gap-8 relative overflow-hidden border border-card-border animate-pulse">
      {/* 헤더 부분 (타이틀 & 토글 / 혹은 펌프 대수) */}
      <div className="flex justify-between items-center z-20">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="w-24 h-6 bg-muted/20 rounded-md" />
            {!isSimulation && <div className="w-10 h-6 bg-card-border rounded-full" />}
          </div>
          {isSimulation && <div className="w-32 h-8 bg-card-border/50 rounded-2xl" />}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between min-h-0">
        {/* 1. 상단 배수지 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 z-10">
          {skeletonCards.map((_, i) => (
            <div key={`top-${i}`} className="w-36 h-20 bg-card-border rounded-xl lg:rounded-2xl" />
          ))}
        </div>

        {/* 2. 중앙 정수장 섹션 스켈레톤 */}
        <div className="relative z-10 flex flex-col items-center shrink-0">
          <div className="relative bg-card/50 border-3 border-card-border p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-sm flex items-center gap-4 min-w-45 lg:min-w-50">
            {/* 아이콘 박스 */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-muted/20 rounded-xl lg:rounded-2xl shrink-0" />

            {/* 텍스트 데이터 라인들 */}
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-card-border rounded w-12" />
              <div className="h-5 bg-muted/20 rounded w-full" />
              <div className="h-px bg-card-border w-full" />
              <div className="h-5 bg-muted/20 rounded w-full" />
            </div>
          </div>
          {/* 하단 캡션 */}
          <div className="mt-2 w-20 h-3 bg-card-border rounded" />
        </div>

        {/* 3. 하단 배수지 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 z-10">
          {skeletonCards.map((_, i) => (
            <div key={`bottom-${i}`} className="w-36 h-20 bg-card-border rounded-xl lg:rounded-2xl" />
          ))}
        </div>
      </div>

      {/* 4. 시뮬레이션 슬라이더 스켈레톤 */}
      {isSimulation && (
        <div className="mt-4 px-4 py-4 bg-muted/5 border border-card-border rounded-2xl z-20">
          <div className="flex justify-between mb-4">
            <div className="w-20 h-4 bg-muted/20 rounded" />
            <div className="w-12 h-4 bg-muted/20 rounded" />
          </div>
          <div className="w-full h-2 bg-card-border rounded" />
        </div>
      )}
    </div>
  );
}
