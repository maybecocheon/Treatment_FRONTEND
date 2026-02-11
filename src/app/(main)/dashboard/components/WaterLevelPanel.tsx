'use client'

import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { AlertTriangle, Factory } from "lucide-react";
import { useEffect } from "react";
import { WaterWave } from "../../map/components/WaterWave";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import { useTreatmentData } from "@/hooks/useTreatmentData";

export default function WaterLevelPanel() {
  const { reservoirLevels, loadLevels, error } = useReservoirLevel();
  const { treatment, loadTreatment } = useTreatmentData();

  useEffect(() => {
    loadLevels();
    loadTreatment();
  }, []);

  if (error) return (
    <div className="glass rounded-4xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels) return <WaterLevelPanelSkeleton />;

  // 데스크톱용 행 분할
  const midpoint = Math.ceil(reservoirLevels.length / 2);
  const firstRow = reservoirLevels.slice(0, midpoint);
  const secondRow = reservoirLevels.slice(midpoint);

  return (
    <div className="glass rounded-3xl lg:rounded-4xl p-4 lg:p-6 h-full flex flex-col min-h-0 overflow-hidden">
      <h2 className="text-xs lg:text-sm font-black text-slate-800 shrink-0">수위 현황</h2>

      {/* 내부 컨테이너 */}
      <div className="flex-1 relative flex flex-col justify-start items-center pt-2 gap-4">
        
        {/* 1. 정수장 섹션 */}
        <div className="relative z-10 mb-2 lg:mb-6 flex flex-col items-center group shrink-0">
          <div className="relative bg-white/90 border-2 border-slate-700 p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-3 lg:gap-4 min-w-[140px] lg:min-w-40">
            <div className="bg-slate-700 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl shadow-inner">
              <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">송수량</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg lg:text-xl font-black text-slate-800 tabular-nums leading-none">
                  {treatment?.flowOutAmt?.toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-slate-500 text-nowrap">m³/h</span>
              </div>
            </div>
          </div>
          <span className="mt-2 text-[10px] lg:text-[11px] font-black text-slate-800">광역 정수장</span>
        </div>

        {/* 2. 배수지 섹션 */}
        <div className="w-full">
          {/* 모바일 뷰 */}
          <div className="grid grid-cols-2 gap-3 lg:hidden pb-4">
            {reservoirLevels.map((res, i) => renderCard(res, i))}
          </div>

          {/* 데스크톱 뷰 */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            <div className="flex justify-center gap-3 w-full">
              {firstRow.map((res, i) => renderCard(res, i))}
            </div>
            <div className="flex justify-center gap-3 w-full">
              {secondRow.map((res, i) => renderCard(res, i))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 카드 렌더링 함수 분리
  function renderCard(res: any, i: number) {
    const isDanger = res.level > res.maxLevel * 0.9 || res.level < res.maxLevel * 0.4;
    const levelPercent = (res.level / res.maxLevel) * 100;

    return (
      <div key={res.facilityId || i} className="flex-1 lg:max-w-30 group cursor-pointer transition-all duration-300 hover:-translate-y-1 lg:hover:-translate-y-2">
        <div className={`relative w-full h-16 lg:h-20 rounded-xl lg:rounded-2xl overflow-hidden border-2 shadow-md backdrop-blur-md bg-white/40 transition-colors
          ${isDanger ? "border-red-500 shadow-red-100" : "border-blue-400 shadow-blue-50"}`}>

          <WaterWave levelPercent={levelPercent} danger={isDanger} />

          {isDanger && (
            <div className="absolute top-1 right-1 z-10">
              <AlertTriangle size={10} className="text-red-500 animate-bounce" />
            </div>
          )}

          <div className="relative inset-0 flex flex-col items-center justify-center h-full p-2">
            <span className="text-[10px] lg:text-[12px] font-black text-slate-700 truncate w-full text-center leading-tight mb-0.5 lg:mb-1">
              {res.reservoirName}
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-base lg:text-lg font-black ${isDanger ? "text-red-600" : "text-slate-800"}`}>
                {levelPercent.toFixed(0)}
              </span>
              <span className="text-[6px] lg:text-[7px] text-slate-500 font-bold">%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}