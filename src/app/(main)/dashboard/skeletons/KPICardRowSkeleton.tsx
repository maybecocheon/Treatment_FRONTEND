export default function KPICardRowSkeleton() {
  return (
    <div className="shrink-0 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3"
          >
            {/* 상단 라벨 (송수량, 평균 수위 등) */}
            <div className="h-3 w-12 bg-slate-200 rounded" />
            
            {/* 중앙 메인 수치 (숫자 부분) */}
            <div className="flex items-baseline gap-1">
              <div className="h-8 w-16 bg-slate-100 rounded-lg" />
              <div className="h-4 w-6 bg-slate-50 rounded" />
            </div>
            
            {/* 하단 서브 라벨 (정수장, 시설명 등) */}
            <div className="h-3 w-20 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}