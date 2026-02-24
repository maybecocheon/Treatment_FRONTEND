'use client'

import { useAllPrediction } from "@/hooks/useAllPrediction";
import { ReservoirLevelType } from "@/types/types";

export default function RiskEventPanel({ dangerReservoirs }: { dangerReservoirs: ReservoirLevelType[] }) {
  const { checkLevelRisk } = useAllPrediction();

  return (
    <div className="bg-white backdrop-blur-sm border border-slate-200/50 rounded-2xl p-3 lg:p-4 flex flex-col max-h-80 transition-all">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-center mb-3 shrink-0 px-1">
        <h2 className="text-xs lg:text-sm font-bold text-slate-700 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          배수지 위험 탐지
        </h2>
      </div>

      {/* 로그 리스트 영역 */}
      <div className="overflow-y-auto space-y-2 pr-1 min-h-0 scrollbar-hide">
        {dangerReservoirs.map(r => (
          <div
            key={r.facilityId}
            className="bg-white/60 hover:bg-white border border-slate-200/60 rounded-xl p-3 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {/* 상태 아이콘 강조 */}
                <div className="w-1 h-8 rounded-full bg-rose-500"></div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{r.reservoirName}</span>
                  <span className="text-[10px] text-rose-600 font-semibold">{checkLevelRisk(r) === "low" ? "저수위 경고 발생" : "고수위 경고 발생"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}