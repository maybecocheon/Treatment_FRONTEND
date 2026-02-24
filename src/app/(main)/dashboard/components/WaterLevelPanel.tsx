'use client'

import { Droplets, Factory, Waves } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import { useAtom, useSetAtom } from "jotai";
import { selectedFacilityIdAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import WaterLevelCard from "@/components/main/WaterLevelCard";
import { Point, ReservoirLevelType, TreatmentType } from "@/types/types";
import FlowingLine from "./FlowingLine";

interface WaterLevelPanelProps {
  reservoirLevels: ReservoirLevelType[];
  isLoading: boolean;
  error: Error | null;
  loadLevels: () => void;
  treatment: TreatmentType | undefined;
  loadTreatment: () => void;
  dangerReservoirs: ReservoirLevelType[];
}

export default function WaterLevelPanel({ reservoirLevels, isLoading, error, loadLevels, treatment, loadTreatment, dangerReservoirs }: WaterLevelPanelProps) {
  // 수위 혹은 유입량 토글
  const [isLevel, setIsLevel] = useState(true);

  // 데이터
  const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
  const setSelectedFacilityId = useSetAtom(selectedFacilityIdAtom);

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

  const toggle = () => {
    setIsLevel(!isLevel);
  };

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
  }, [reservoirLevels.length, updateConnections]);

  if (error) return (
    <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels || !treatment) return <WaterLevelPanelSkeleton />;

  return (
    <div ref={containerRef} className="h-full glass rounded-2xl p-4 lg:p-6 flex flex-col relative">
      <div className="flex gap-2 mb-3">
        <h2 className="text-md font-black text-slate-600 px-1 flex items-center gap-1">
          {isLevel ? (
            <>
              <Droplets size={18} className="text-blue-500" />
              <span>수위 현황</span>
            </>
          ) : (
            <>
              <Waves size={18} className="text-sky-500" />
              <span>유입량 현황</span>
            </>
          )}
        </h2>
        <button onClick={toggle} className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isLevel ? "bg-blue-600" : "bg-gray-300"}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isLevel ? "translate-x-4" : "translate-x-0"}`} />
        </button>
      </div>

      <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: "100%", height: "100%" }}>
        {connections.map((conn, idx) => (
          <FlowingLine key={idx} start={conn.start} end={conn.end} />
        ))}
      </svg>

      <div className="flex-1 flex flex-col gap-4 items-center">
        {/* 1. 정수장 섹션 */}
        <div ref={plantRef} className="relative z-10 mb-10 flex flex-col items-center shrink-0">
          <div className="relative bg-white/90 border-2 border-slate-700 p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-4 min-w-[180px] lg:min-w-[200px]">
            {/* 아이콘 섹션 */}
            <div className="bg-slate-700 p-2.5 lg:p-3 rounded-xl lg:rounded-2xl shadow-inner shrink-0">
              <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>

            {/* 데이터 섹션 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center">
              {/* 송수량 행 */}
              <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-tighter leading-none">
                송수량
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-lg lg:text-xl font-black text-slate-800 tabular-nums leading-none">
                  {Number(treatment.flowOutAmt?.toFixed(0)).toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-slate-500 shrink-0">m³/h</span>
              </div>

              {/* 구분선 (선택 사항) */}
              <div className="col-span-2 h-px bg-slate-100 my-0.5" />

              {/* 압력 행 */}
              <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-tighter leading-none">
                압력
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-lg lg:text-xl font-black text-slate-800 tabular-nums leading-none">
                  {Number(treatment.pressOutAvg?.toFixed(2)).toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-slate-500 shrink-0">kgf/cm²</span>
              </div>
            </div>
          </div>

          {/* 하단 캡션 */}
          <div className="mt-3 flex flex-col items-center">
            <span className="text-[10px] lg:text-[11px] font-black text-slate-800 uppercase tracking-widest">
              광역 정수장
            </span>
          </div>
        </div>

        {/* 2. 배수지 섹션 */}
        <div className="w-full flex flex-wrap justify-center gap-2 lg:gap-3 pb-2">
          {reservoirLevels.map((res, i) => (
            <div key={i} className="shrink-0" ref={el => { cardsRef.current[i] = el; }}>
              <WaterLevelCard
                res={res}
                mapLevel={-1}
                isSelected={selectedReservoir?.facilityId === res.facilityId}
                onClick={() => { setSelectedReservoir(res); setSelectedFacilityId(res.facilityId); }}
                isLevel={isLevel}
                isLoading={isLoading}
                isDanger={!!dangerReservoirs.find(dr => dr.facilityId === res.facilityId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}