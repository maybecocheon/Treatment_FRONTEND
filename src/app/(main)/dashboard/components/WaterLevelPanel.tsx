'use client'

import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { Factory } from "lucide-react";
import { useEffect } from "react";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import { useTreatment } from "@/hooks/useTreatment";
import { useAtom } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import WaterLevelCard from "@/components/main/skeletons/WaterLevelCard";

export default function WaterLevelPanel() {
  const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);

  const { reservoirLevels, loadLevels, error } = useReservoirLevel();
  const { treatment, loadTreatment } = useTreatment();

  useEffect(() => {
    loadLevels();
    loadTreatment();
    setSelectedReservoir(reservoirLevels[0]);
  }, []);

  if (error) return (
    <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels || !treatment) return <WaterLevelPanelSkeleton />;

  // 데스크톱용 행 분할
  const midpoint = Math.ceil(reservoirLevels.length / 2);
  const firstRow = reservoirLevels.slice(0, midpoint);
  const secondRow = reservoirLevels.slice(midpoint);
  // const thirdRow = reservoirLevels.slice(2 * midpoint, reservoirLevels.length);


  return (
    <div className="glass rounded-2xl p-4 lg:p-6 h-full flex flex-col min-h-0 overflow-hidden">
      <h2 className="text-md font-black text-slate-800 shrink-0">수위 현황</h2>

      {/* 내부 컨테이너 */}
      <div className="flex-1 relative flex flex-col justify-start items-center pt-2 gap-4">

        {/* 1. 정수장 섹션 */}
        <div className="relative z-10 mb-2 lg:mb-6 flex flex-col items-center group shrink-0">
          <div className="relative bg-white/90 border-2 border-slate-700 p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-3 lg:gap-4 min-w-35 lg:min-w-40">
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
          <div className="grid grid-cols-2 gap-2 lg:hidden pb-4">
            {reservoirLevels.map((res, i) => <WaterLevelCard key={i} res={res} mapLevel={-1} onClick={() => setSelectedReservoir(res)} />)}
          </div>

          {/* 데스크톱 뷰 */}
          <div className="hidden lg:flex lg:flex-col lg:gap-2">
            <div className="flex justify-center gap-2 w-full">
              {firstRow.map((res, i) => <WaterLevelCard key={i} res={res} mapLevel={-1} onClick={() => setSelectedReservoir(res)} />)}
            </div>
            <div className="flex justify-center gap-2 w-full">
              {secondRow.map((res, i) => <WaterLevelCard key={i} res={res} mapLevel={-1} onClick={() => setSelectedReservoir(res)} />)}
            </div>
            {/* <div className="flex justify-center gap-2 w-full">
              {thirdRow.map((res, i) => <WaterLevelCard key={i} res={res} mapLevel={-1} onClick={() => setSelectedReservoir(res)} />)}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}