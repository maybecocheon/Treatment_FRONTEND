'use client'

import { Droplets, Factory, Waves } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import WaterLevelCard from "@/components/main/WaterLevelCard";
import { Point, ReservoirLevelType, TreatmentType } from "@/types/types";
import FlowingLine from "./FlowingLine";
import PageFallback from "@/components/skeletons/PageFallback";
import { useAtom } from "jotai";
import { timeSlideAtom, virtualTimeAtom } from "@/atoms/uniAtoms";
import dayjs from "dayjs";
import { useRefreshTime } from "@/hooks/useRefreshTime";
import { Clock } from "lucide-react";

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

  // 타임 슬라이드 상태
  const [timeSlide, setTimeSlide] = useAtom(timeSlideAtom);
  const { roundedTime } = useRefreshTime();

  // 페이지 벗어날 시 (unmount) 타임 슬라이드 초기화
  useEffect(() => {
    return () => {
      setTimeSlide(null);
    };
  }, [setTimeSlide]);

  // 슬라이더 값 계산 (0 ~ 48, 15분 단위, -6h ~ +6h 범위)
  // 0: -6시간, 24: 현재(roundedTime), 48: +6시간
  const calculateSliderValue = () => {
    if (!timeSlide || !roundedTime) return 24;
    const diffMin = dayjs(timeSlide).diff(dayjs(roundedTime), 'minute');
    return 24 + (diffMin / 15);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const offsetMin = (val - 24) * 15;
    const newTime = dayjs(roundedTime).add(offsetMin, 'minute').format("YYYY-MM-DD HH:mm:ss");
    setTimeSlide(newTime);
  };

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
  // 화면 크기가 변할 때 즉시 선 재계산
  useEffect(() => {
    const handleResize = () => {
      updateConnections();
    };

    window.addEventListener("resize", handleResize);
    updateConnections();

    return () => window.removeEventListener("resize", handleResize);
  }, [updateConnections]);

  // 데이터 변경 시 호출하는 타이머
  useEffect(() => {
    if (reservoirLevels.length > 0 && treatment) {
      const timer = setTimeout(updateConnections, 100);
      return () => clearTimeout(timer);
    }
  }, [reservoirLevels, treatment, updateConnections]);

  const topCards = reservoirLevels.slice(0, 6);
  const bottomCards = reservoirLevels.slice(6, 12);

  // 수위 현황 | 유입량 현황
  const toggle = () => setIsLevel(!isLevel);

  if (error) return (
    <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
      <ErrorFallback error={error} onClick={() => { loadLevels(); loadTreatment(); }} />
    </div>
  );

  if (!reservoirLevels || !treatment || isLoading) return <PageFallback skeleton={<WaterLevelPanelSkeleton />} />;

  return (
    <div ref={containerRef} className="h-full glass rounded-2xl p-5 flex flex-col relative">
      <div className="flex gap-2 mb-2">
        <h2 className="text-md font-black text-foreground opacity-80 px-1 flex items-center gap-1">
          {isLevel ? (
            <>
              <Droplets size={18} className="text-primary" />
              <span>수위 현황</span>
            </>
          ) : (
            <>
              <Waves size={18} className="text-primary" />
              <span>유입량 현황</span>
            </>
          )}
        </h2>
        <button onClick={toggle} className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isLevel ? "bg-primary" : "bg-muted/30"}`}>
          <div className={`bg-primary-foreground w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isLevel ? "translate-x-4" : "translate-x-0"}`} />
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
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 mb-2 z-10">
          {topCards.map((res, i) => (
            <div key={res.facilityId} ref={el => { cardsRef.current[i] = el; }}>
              <WaterLevelCard res={res} mapLevel={-1} isLevel={isLevel} isLoading={isLoading} status="dashboard" />
            </div>
          ))}
        </div>

        {/* 1. 정수장 섹션 */}
        <div ref={plantRef} className="relative z-10 mb-2 flex flex-col items-center shrink-0">
          <div className="relative bg-card/90 border-3 border-card-border p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-4 min-w-45 lg:min-w-50">
            {/* 아이콘 섹션 */}
            <div className="bg-primary p-2.5 lg:p-3 rounded-xl lg:rounded-2xl shadow-inner shrink-0">
              <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>

            {/* 데이터 섹션 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center">
              {/* 송수량 행 */}
              <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">
                송수량
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">
                  {Number(treatment.flowOutAmt?.toFixed(0)).toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">m³/h</span>
              </div>

              {/* 구분선 */}
              <div className="col-span-2 h-px bg-card-border/50 my-0.5" />

              {/* 압력 행 */}
              <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">
                압력
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">
                  {Number(treatment.pressOutAvg?.toFixed(2)).toLocaleString() || 0}
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">kgf/cm²</span>
              </div>
            </div>
          </div>

          {/* 하단 캡션 */}
          <div className="mt-1 flex flex-col items-center">
            <span className="text-[10px] lg:text-[11px] font-black text-foreground/80 uppercase tracking-widest">
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
      {/* 타임 슬라이드 */}
      <div className="mt-4 px-4 py-2 bg-muted/5 border border-card-border/50 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-xs font-bold text-muted uppercase tracking-wider">시간별 수위 데이터</span>
          </div>
          <span className="text-sm font-black text-primary tabular-nums">
            {timeSlide ? dayjs(timeSlide).format("HH:mm") : "실시간 (현재)"}
          </span>
        </div>

        <div className="relative flex items-center gap-4">
          <span className="text-[10px] font-bold text-muted/50">-6h</span>
          <input
            type="range"
            min="0"
            max="48"
            step="1"
            value={calculateSliderValue()}
            onChange={handleSliderChange}
            className="flex-1 h-1.5 bg-card-border/50 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-[10px] font-bold text-muted/50">+6h</span>
        </div>

        <div className="flex justify-between mt-1 px-7">
          <div className="w-px h-1 bg-card-border/30" />
          <div className="w-px h-2 bg-primary/40" />
          <div className="w-px h-1 bg-card-border/30" />
        </div>
      </div>
    </div>
  );
}