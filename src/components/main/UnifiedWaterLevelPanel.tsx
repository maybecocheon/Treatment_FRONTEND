'use client'

import { Clock, Droplets, Factory, Gauge, Waves } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import dayjs from "dayjs";
import { Point, SimulationType } from "@/types/types";
import { timeSlideAtom } from "@/atoms/uniAtoms";
import { useRefreshTime } from "@/hooks/useRefreshTime";
import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { useTreatment } from "@/hooks/useTreatment";
import { useSimulation } from "@/hooks/useSimulation";
import FlowingLine from "@/app/(main)/dashboard/components/FlowingLine";
import PageFallback from "@/components/skeletons/PageFallback";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import WaterLevelPanelSkeleton from "@/app/(main)/dashboard/skeletons/WaterLevelPanelSkeleton";
import UnifiedWaterCard from "./UnifiedWaterCard";
import FetchingSpinner from "./FetchingSpinner";

interface UnifiedWaterLevelPanelProps {
    mode: 'dashboard' | 'simulation';
}

export default function UnifiedWaterLevelPanel({ mode }: UnifiedWaterLevelPanelProps) {
    // 1. 공통 데이터 Fetch
    const { reservoirLevels, loadLevels, error: levelError, isLoading: isLevelLoading } = useReservoirLevel();

    // 2. 대시보드 전용 Logic
    const { treatment, loadTreatment, isLoading: isTreatmentLoading } = useTreatment();
    const [isLevel, setIsLevel] = useState(true); // 수위/유입량 토글

    // 3. 시뮬레이션 전용 Logic
    const [selectedPumpCount, setSelectedPumpCount] = useState<number>(1);
    const { simulation, loadSimulation, error: simError, isLoading: isSimulationLoading } = useSimulation(mode === 'simulation' ? selectedPumpCount : 0);
    const [timeSlide, setTimeSlide] = useAtom(timeSlideAtom);
    const { roundedTime } = useRefreshTime();

    // 데이터 병합 Logic (Simulation 모드인 경우)
    const displayedData = useMemo(() => {
        if (!reservoirLevels || reservoirLevels.length === 0) return [];
        if (mode === 'dashboard') return reservoirLevels;

        if (!simulation || simulation.length === 0) return reservoirLevels;

        return reservoirLevels.map(res => {
            const simItem = simulation.find(s => s.facilityId === res.facilityId);
            return simItem ? simItem : res;
        });
    }, [reservoirLevels, simulation, mode]);

    // 시뮬레이션 합계 계산
    const calculateTotalSimFlow = useCallback((type: 'flowIn' | 'flowOut') => {
        if (mode === 'dashboard' || !displayedData || !timeSlide) return 0;
        const currentTime = dayjs(timeSlide);

        return displayedData.reduce((sum, res) => {
            if (!('chartData' in res)) return sum;
            const matchingItem = (res as SimulationType).chartData.find(
                item => dayjs(item.time).isSame(currentTime, 'minute')
            );
            return sum + (matchingItem?.[type] || 0);
        }, 0);
    }, [displayedData, timeSlide, mode]);

    const simTotalIn = useMemo(() => calculateTotalSimFlow('flowIn'), [calculateTotalSimFlow]);
    const simTotalOut = useMemo(() => calculateTotalSimFlow('flowOut'), [calculateTotalSimFlow]);

    // SVG 연결선 Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const plantRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [connections, setConnections] = useState<{ start: Point; end: Point }[]>([]);

    const updateConnections = useCallback(() => {
        if (!containerRef.current || !plantRef.current || displayedData.length === 0) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const plantRect = plantRef.current.getBoundingClientRect();

        const plantPoint: Point = {
            x: plantRect.left - containerRect.left + plantRect.width / 2,
            y: plantRect.top - containerRect.top + plantRect.height / 2,
        };

        const newConnections = displayedData.map((_, index) => {
            const cardEl = cardsRef.current[index];
            if (!cardEl) return null;

            const cardRect = cardEl.getBoundingClientRect();
            const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;

            let targetX, targetY;
            const isDesktop = window.innerWidth >= 1024;

            if (isDesktop) {
                targetX = cardCenterX;
                targetY = cardCenterY < plantPoint.y
                    ? cardRect.top - containerRect.top + cardRect.height
                    : cardRect.top - containerRect.top;
            } else {
                targetX = cardCenterX < plantPoint.x
                    ? cardRect.left - containerRect.left + cardRect.width
                    : cardRect.left - containerRect.left;
                targetY = cardCenterY;
            }

            return { start: plantPoint, end: { x: targetX, y: targetY } };
        }).filter((conn): conn is { start: Point; end: Point } => conn !== null);

        setConnections(newConnections);
    }, [displayedData]);

    useEffect(() => {
        const handleResize = () => updateConnections();
        window.addEventListener("resize", handleResize);
        updateConnections();
        return () => window.removeEventListener("resize", handleResize);
    }, [updateConnections]);

    useEffect(() => {
        const timer = setTimeout(updateConnections, 100);
        return () => clearTimeout(timer);
    }, [displayedData, updateConnections]);

    // 슬라이더 Logic
    const calculateSliderValue = () => {
        if (mode === 'dashboard') {
            // Dashboard mode might still use slider if requested, but plan said only simulation
            return 24;
        }
        if (!timeSlide || !roundedTime) return 0;
        const diffMin = dayjs(timeSlide).diff(dayjs(roundedTime), 'minute');
        return diffMin / 15;
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        const offsetMin = val * 15;
        const newTime = dayjs(roundedTime).add(offsetMin, 'minute').format("YYYY-MM-DD HH:mm:ss");
        setTimeSlide(newTime);
    };

    // Unmount 시 타임 슬라이드 초기화
    useEffect(() => {
        return () => { setTimeSlide(null); };
    }, [setTimeSlide]);

    if (levelError || (mode === 'simulation' && simError)) {
        return (
            <div className="glass rounded-2xl flex items-center justify-center h-full w-full">
                <ErrorFallback error={levelError || simError} onClick={() => { loadLevels(); mode === 'simulation' ? loadSimulation() : loadTreatment(); }} />
            </div>
        );
    }

    if (isLevelLoading || (mode === 'dashboard' && isTreatmentLoading) || (mode === 'simulation' && isSimulationLoading) || displayedData.length === 0) {
        return <PageFallback skeleton={<WaterLevelPanelSkeleton isSimulation={mode === 'simulation'} />} />;
    }

    const topCards = displayedData.slice(0, 6);
    const bottomCards = displayedData.slice(6, 12);

    return (
        <div ref={containerRef} className="h-full glass rounded-2xl p-5 flex flex-col gap-8 relative overflow-hidden border border-card-border">
            <FetchingSpinner isFetching={isLevelLoading || isTreatmentLoading || isSimulationLoading} />
            {/* Header / Controls */}
            <div className="flex justify-between items-center z-20">
                {mode === 'dashboard' ? (
                    <div className="flex gap-2">
                        <h2 className="text-md font-black text-foreground opacity-80 px-1 flex items-center gap-1">
                            {isLevel ? <><Droplets size={18} className="text-primary" /><span>수위 현황</span></> : <><Waves size={18} className="text-primary" /><span>유입량 현황</span></>}
                        </h2>
                        <button onClick={() => setIsLevel(!isLevel)} className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isLevel ? "bg-primary" : "bg-muted/30"}`}>
                            <div className={`bg-primary-foreground w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isLevel ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <h2 className="text-md font-black text-foreground opacity-80 px-1 flex items-center gap-2">
                            <Gauge size={18} className="text-success-text" />
                            <span>가동 펌프 대수</span>
                        </h2>
                        <div className="flex gap-1">
                            {[1, 2, 3].map(count => (
                                <button key={count} onClick={() => setSelectedPumpCount(count)} className={`z-10 text-[12px] px-4 py-1 rounded-2xl transition-all ${selectedPumpCount === count ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-muted/10 text-muted hover:bg-muted/20"}`}>{count}대</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* SVG Connections */}
            <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: "100%", height: "100%" }}>
                {connections.map((conn, idx) => (
                    <FlowingLine key={idx} start={conn.start} end={conn.end} />
                ))}
            </svg>

            <div className="flex-1 flex flex-col items-center justify-between min-h-0">
                {/* Top Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 z-10">
                    {topCards.map((res, i) => (
                        <div key={res.facilityId} ref={el => { cardsRef.current[i] = el; }}>
                            <UnifiedWaterCard res={res} mapLevel={-1} isLevel={isLevel} isLoading={false} status="dashboard" />
                        </div>
                    ))}
                </div>

                {/* Plant Section */}
                <div ref={plantRef} className="relative z-10 flex flex-col items-center shrink-0">
                    <div className="relative bg-card/90 border-3 border-card-border p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-md flex items-center gap-4 min-w-45 lg:min-w-50">
                        <div className="bg-primary p-2.5 lg:p-3 rounded-xl lg:rounded-2xl shadow-inner shrink-0">
                            <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center">
                            {mode === 'dashboard' ? (
                                <>
                                    <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">송수량</span>
                                    <div className="flex items-baseline gap-1 justify-end">
                                        <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">{Number(treatment?.flowOutAmt?.toFixed(0)).toLocaleString() || 0}</span>
                                        <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">m³/h</span>
                                    </div>
                                    <div className="col-span-2 h-px bg-card-border/50 my-0.5" />
                                    <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">압력</span>
                                    <div className="flex items-baseline gap-1 justify-end">
                                        <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">{Number(treatment?.pressOutAvg?.toFixed(2)).toLocaleString() || 0}</span>
                                        <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">kgf/cm²</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">유입량</span>
                                    <div className="flex items-baseline gap-1 justify-end">
                                        <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">{simTotalIn.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}</span>
                                        <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">m³/h</span>
                                    </div>
                                    <div className="col-span-2 h-px bg-card-border/50 my-0.5" />
                                    <span className="text-[10px] lg:text-[11px] font-bold text-muted uppercase tracking-tighter leading-none">유출량</span>
                                    <div className="flex items-baseline gap-1 justify-end">
                                        <span className="text-lg lg:text-xl font-black text-foreground tabular-nums leading-none">{simTotalOut.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}</span>
                                        <span className="text-[9px] lg:text-[10px] font-bold text-muted opacity-60 shrink-0">m³/h</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-1 flex flex-col items-center">
                        <span className="text-[10px] lg:text-[11px] font-black text-foreground/80 uppercase tracking-widest">광역 정수장</span>
                    </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-3 gap-x-20 lg:gap-x-3 z-10">
                    {bottomCards.map((res, i) => (
                        <div key={res.facilityId} ref={el => { cardsRef.current[i + 6] = el; }}>
                            <UnifiedWaterCard res={res} mapLevel={-1} isLevel={isLevel} isLoading={false} status="dashboard" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulation Slider */}
            {mode === 'simulation' && (
                <div className="mt-4 px-4 py-4 bg-muted/5 border border-card-border/50 rounded-2xl z-20">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            <span className="text-xs font-bold text-muted uppercase tracking-wider">시간별 수위</span>
                        </div>
                        <span className="text-sm font-black text-primary">
                            {timeSlide ? dayjs(timeSlide).format("HH:mm") : "실시간 (현재)"}
                        </span>
                    </div>
                    <div className="relative flex items-center gap-4 pb-2">
                        <span className="text-[10px] font-bold text-muted/50">현재</span>
                        <input
                            type="range"
                            min="0"
                            max="94"
                            step="1"
                            value={calculateSliderValue()}
                            onChange={handleSliderChange}
                            className="flex-1 h-1.5 bg-card-border/50 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-[10px] font-bold text-muted/50">24시간 후</span>
                    </div>
                </div>
            )}
        </div>
    );
}
