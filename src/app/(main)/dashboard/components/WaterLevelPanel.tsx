'use client'

import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { Factory } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import { useTreatment } from "@/hooks/useTreatment";
import { useAtom, useSetAtom } from "jotai";
import { selectedFacilityIdAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import WaterLevelCard from "@/components/main/skeletons/WaterLevelCard";
import { Point } from "@/types/types";
import FlowingLine from "./FlowingLine";

export default function WaterLevelPanel() {
  // 데이터
  const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
  const setSelectedFacilityId = useSetAtom(selectedFacilityIdAtom);
  const { reservoirLevels, loadLevels, error } = useReservoirLevel("2023-01-01 00:00:01");
  const { treatment, loadTreatment } = useTreatment("2023-01-01 00:00:01");

  // 물 흐르는 모션
  const containerRef = useRef<HTMLDivElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [connections, setConnections] = useState<{ start: Point; end: Point }[]>([]);

  useEffect(() => {
    if (reservoirLevels.length > 0) {
      setSelectedReservoir(reservoirLevels[0]);
      setSelectedFacilityId(reservoirLevels[0].facilityId);
    }
    return () => { setSelectedReservoir(null); setSelectedFacilityId(0); }
  }, []);


  // 좌표 및 물 흐름 업데이트
  const updateConnections = useCallback(() => {
    requestAnimationFrame(() => {
      if (!containerRef.current || !plantRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const plantRect = plantRef.current.getBoundingClientRect();

      const plantCenterBottom: Point = {
        x: plantRect.left - containerRect.left + plantRect.width / 2,
        y: plantRect.top - containerRect.top + plantRect.height,
      };

      const newConnections = reservoirLevels.map((_, index) => {
        const cardEl = cardsRef.current[index];
        if (!cardEl) return null;

        const cardRect = cardEl.getBoundingClientRect();
        return {
          start: plantCenterBottom,
          end: {
            x: cardRect.left - containerRect.left + cardRect.width / 2,
            y: cardRect.top - containerRect.top,
          },
        };
      }).filter((conn): conn is { start: Point; end: Point } => conn !== null);

      setConnections(newConnections);
    });
  }, [reservoirLevels]);

  // 실시간 위치 추적
  useEffect(() => {
    // 부모 컨테이너(containerRef)의 크기가 변할 때를 감지
    const observer = new ResizeObserver(updateConnections);
    if (containerRef.current) observer.observe(containerRef.current);
    
    const timer = setTimeout(updateConnections, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [updateConnections]);

  if (error) return (
    <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels || !treatment) return <WaterLevelPanelSkeleton />;

  return (
    <div ref={containerRef} className="glass rounded-2xl p-4 lg:p-6 flex flex-col relative">
      <h2 className="text-md font-black text-slate-800 shrink-0 mb-2">수위 현황</h2>

      <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%' }}>
        {connections.map((conn, idx) => (
          <FlowingLine key={idx} start={conn.start} end={conn.end} />
        ))}
      </svg>

      <div className="flex-1 flex flex-col gap-4 items-center">
        {/* 1. 정수장 섹션 */}
        <div ref={plantRef} className="relative z-10 mb-10 flex flex-col items-center shrink-0">
          <div className="relative bg-white/90 border-2 border-slate-700 p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-3 lg:gap-4 min-w-35 lg:min-w-40">
            <div className="bg-slate-700 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl shadow-inner">
              <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">송수량</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg lg:text-xl font-black text-slate-800 tabular-nums leading-none">
                  {Number(treatment.flowOutAmt?.toFixed(0)).toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-slate-500">m³/h</span>
              </div>
            </div>
          </div>
          <span className="mt-2 text-[10px] lg:text-[11px] font-black text-slate-800 uppercase tracking-widest">광역 정수장</span>
        </div>

        {/* 2. 배수지 섹션 */}
        <div className="w-full flex flex-wrap justify-center gap-2 lg:gap-3 pb-2">
          {reservoirLevels.map((res, i) => (
            <div key={i} className="shrink-0" ref={el => { cardsRef.current[i] = el; }}>
              <WaterLevelCard
                res={res}
                mapLevel={-1}
                isSelected={selectedReservoir?.facilityId === res.facilityId}
                onClick={() => setSelectedReservoir(res)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}