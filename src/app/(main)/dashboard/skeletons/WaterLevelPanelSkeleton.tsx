'use client'

export default function WaterLevelPanelSkeleton() {
  // 카드 6개씩 두 줄 생성을 위한 배열
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="h-full glass rounded-2xl p-4 lg:p-6 flex flex-col relative animate-pulse">
      {/* 헤더 부분 (타이틀 & 토글) */}
      <div className="flex gap-2 mb-6">
        <div className="w-24 h-6 bg-slate-200 rounded-md" />
        <div className="w-10 h-6 bg-slate-100 rounded-full" />
      </div>

      <div className="flex flex-col items-center">
        {/* 1. 상단 배수지 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 mb-5">
          {skeletonCards.map((_, i) => (
            <div key={`top-${i}`} className="w-25 h-20 lg:w-30 bg-slate-100 rounded-xl" />
          ))}
        </div>

        {/* 2. 중앙 정수장 섹션 스켈레톤 */}
        <div className="mb-5 flex flex-col items-center">
          <div className="bg-white border-2 border-slate-100 p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-sm flex items-center gap-4 min-w-45 lg:min-w-50">
            {/* 아이콘 박스 */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-xl lg:rounded-2xl shrink-0" />
            
            {/* 텍스트 데이터 라인들 */}
            <div className="flex-1 space-y-3">
              <div className="h-3 bg-slate-100 rounded w-12" />
              <div className="h-5 bg-slate-200 rounded w-full" />
              <div className="h-px bg-slate-50 w-full" />
              <div className="h-5 bg-slate-200 rounded w-full" />
            </div>
          </div>
          {/* 하단 캡션 */}
          <div className="mt-4 w-20 h-3 bg-slate-100 rounded" />
        </div>

        {/* 3. 하단 배수지 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3">
          {skeletonCards.map((_, i) => (
            <div key={`bottom-${i}`} className="w-25 h-20 lg:w-30 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}