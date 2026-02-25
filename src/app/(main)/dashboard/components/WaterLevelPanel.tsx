'use client'

import { Droplets, Factory, Waves } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import WaterLevelCard from "@/components/main/WaterLevelCard";
import { Point, ReservoirLevelType, TreatmentType } from "@/types/types";
import FlowingLine from "./FlowingLine";
import PageFallback from "@/components/skeletons/PageFallback";

interface WaterLevelPanelProps {
  reservoirLevels: ReservoirLevelType[];
  isLoading: boolean;
  error: Error | null;
  loadLevels: () => void;
  treatment: TreatmentType | undefined;
  loadTreatment: () => void;
}

export default function WaterLevelPanel({ reservoirLevels, isLoading, error, loadLevels, treatment, loadTreatment }: WaterLevelPanelProps) {
  // 수위 현황 | 유입량 현황
  const [isLevel, setIsLevel] = useState(true);

  // 정수장 및 배수지 위치
  const containerRef = useRef<HTMLDivElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [connections, setConnections] = useState<{ start: Point; end: Point }[]>([]);

  const updateConnections = useCallback(() => {
    if (!containerRef.current || !plantRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const plantRect = plantRef.current.getBoundingClientRect();

    // 정수장 중앙 좌표
    const plantPoint: Point = {
      x: plantRect.left - containerRect.left + plantRect.width / 2,
      y: plantRect.top - containerRect.top + plantRect.height / 2,
    };

    const newConnections = reservoirLevels.map((_, index) => {
      const cardEl = cardsRef.current[index];
      if (!cardEl) return null;

      const cardRect = cardEl.getBoundingClientRect();
      const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;

      let targetX, targetY;

      // 1. 화면 너비에 따라 모드 판별
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // PC: 상하 6:6 배치
        targetX = cardCenterX;
        // 카드가 정수장보다 위에 있으면 아래 중앙에 붙임
        targetY = cardCenterY < plantPoint.y
          ? cardRect.top - containerRect.top + cardRect.height
          : cardRect.top - containerRect.top;
      } else {
        // 모바일: 좌우 배치
        targetX = cardCenterX < plantPoint.x
          ? cardRect.left - containerRect.left + cardRect.width // 카드의 오른쪽 면
          : cardRect.left - containerRect.left;                // 카드의 왼쪽 면
        targetY = cardCenterY;
      }

      return {
        start: plantPoint,
        end: { x: targetX, y: targetY },
      };
    }).filter((conn): conn is { start: Point; end: Point } => conn !== null);

    setConnections(newConnections);
  }, [reservoirLevels]);

  // 반응형 감지
  // DOM이 브라우저에 페인팅된 직후 실행되도록 약간의 지연
  useEffect(() => {
    if (reservoirLevels.length > 0 && treatment) {
      
      const timer = setTimeout(() => {
        updateConnections();
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [reservoirLevels, treatment, updateConnections]);

  // 다시 돌아왔을 때도 선이 깨지지 않게 보정
  useEffect(() => {
    const handleFocus = () => updateConnections();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [updateConnections]);

  const topCards = reservoirLevels.slice(0, 6);
  const bottomCards = reservoirLevels.slice(6, 12);

  // 수위 현황 | 유입량 현황
  const toggle = () => setIsLevel(!isLevel);

  if (error) return (
    <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels || !treatment) return <PageFallback skeleton={<WaterLevelPanelSkeleton />} />;

  return (
    <div ref={containerRef} className="h-full glass rounded-2xl p-4 lg:p-6 flex flex-col relative">
      <div className="flex gap-2 mb-6">
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

      {/* 물 흐름 선 (SVG) */}
      <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: "100%", height: "100%" }}>
        {connections.map((conn, idx) => (
          <FlowingLine key={idx} start={conn.start} end={conn.end} />
        ))}
      </svg>

      <div className="flex flex-col items-center">
        {/* 1. 상단 배수지 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 mb-5 z-10">
          {topCards.map((res, i) => (
            <div key={res.facilityId} ref={el => { cardsRef.current[i] = el; }}>
              <WaterLevelCard res={res} mapLevel={-1} isLevel={isLevel} isLoading={isLoading} status="dashboard" />
            </div>
          ))}
        </div>

        {/* 1. 정수장 섹션 */}
        <div ref={plantRef} className="relative z-10 mb-5 flex flex-col items-center shrink-0">
          <div className="relative bg-white/90 border-2 border-slate-700 p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-4 min-w-45 lg:min-w-50">
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

        {/* 3. 하단 배수지 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 z-10">
          {bottomCards.map((res, i) => (
            <div key={res.facilityId} ref={el => { cardsRef.current[i + 6] = el; }}>
              <WaterLevelCard res={res} mapLevel={-1} isLevel={isLevel} isLoading={isLoading} status="dashboard" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}