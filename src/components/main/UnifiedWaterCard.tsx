'use client'

import { selectedFacilityTypeAtom, selectedReservoirAtom, selectedReservoirIdAtom, timeSlideAtom } from "@/atoms/uniAtoms";
import { WaterWave } from "@/components/WaterWave";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";
import { ReservoirLevelType, SimulationType } from "@/types/types";
import { useAtom, useSetAtom } from "jotai";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";

interface UnifiedWaterCardProps {
    res: ReservoirLevelType | SimulationType;
    mapLevel: number;
    isLevel?: boolean;
    isLoading: boolean;
    status: string;
}

export default function UnifiedWaterCard({ res, mapLevel, isLevel = true, isLoading = false, status }: UnifiedWaterCardProps) {
    // 데이터
    const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
    const setSelectedReservoirId = useSetAtom(selectedReservoirIdAtom);
    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const mapUI = useMapUI();
    const [timeSlide] = useAtom(timeSlideAtom);

    // 초기화
    useEffect(() => {
        return () => {
            setSelectedReservoir(null);
            setSelectedFacilityType("");
            setSelectedReservoirId(0);
        }
    }, [setSelectedReservoir, setSelectedFacilityType, setSelectedReservoirId]);

    // 시뮬레이션 데이터 여부 확인
    const isSimulation = 'chartData' in res;

    // 현재 슬라이더 시간에 해당하는 데이터 찾기 (시뮬레이션 모드일 때만)
    const currentPredictData = useMemo(() => {
        if (!isSimulation) return null;
        const simRes = res as SimulationType;
        if (!timeSlide || !simRes.chartData) return simRes.chartData?.[0];

        const targetTime = dayjs(timeSlide);
        return simRes.chartData.find(data => dayjs(data.time).isSame(targetTime, 'minute')) || simRes.chartData[0];
    }, [res, isSimulation, timeSlide]);

    // 표시할 수위 및 기타 값 결정
    const displayLevel = useMemo(() => {
        if (isSimulation && currentPredictData) {
            return currentPredictData.predictLevel;
        }
        return (res as ReservoirLevelType).level;
    }, [isSimulation, currentPredictData, res]);

    const displayFlowIn = useMemo(() => {
        if (isSimulation && currentPredictData) {
            return currentPredictData.flowIn;
        }
        return (res as ReservoirLevelType).flowIn;
    }, [isSimulation, currentPredictData, res]);

    const levelPercent = useMemo(() => {
        const max = res.maxLevel || 1; // 0 방지
        return (displayLevel / (max * 1.05)) * 100;
    }, [displayLevel, res.maxLevel]);

    const isDanger = useMemo(() => {
        if (isSimulation && currentPredictData) {
            return displayLevel >= res.maxLevel || displayLevel <= res.minLevel;
        }
        const risk = (res as ReservoirLevelType).riskStatus;
        return risk === "low" || risk === "high";
    }, [isSimulation, currentPredictData, displayLevel, res]);

    const isSelected = selectedReservoir?.facilityId === res.facilityId;

    if (isLoading)
        return <div className="w-40 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-inner">
            <Loader2 className="w-5 h-5 text-slate-300 dark:text-slate-600 animate-spin" />
        </div>

    const handleClick = () => {
        if (status === "map" && mapUI) {
            mapUI.onOpen("배수지", res as ReservoirLevelType);
        } else if (!isSimulation) {
            setSelectedReservoir(res as ReservoirLevelType);
            setSelectedReservoirId(res.facilityId);
        }
    };

    const reservoirName = isSimulation
        ? (res as SimulationType).facilityName
        : (res as ReservoirLevelType).reservoirName;

    return (
        <div
            onClick={handleClick}
            className={`flex-1 group transition-all duration-300
                ${isSelected ? "scale-110" : "hover:-translate-y-1"}
                ${isSimulation ? "cursor-default" : "cursor-pointer"}`}
        >
            <div className={`relative overflow-hidden w-36 h-20 rounded-xl lg:rounded-2xl 
                border-2 backdrop-blur-md transition-all duration-300 glass
                ${isDanger ? "border-red-500" : "border-blue-400 dark:border-blue-700"}
            `}>

                {/* 수위 따라 배경 채우기 */}
                <WaterWave levelPercent={levelPercent} danger={isDanger} />

                {/* 경고 아이콘 */}
                {isDanger && (
                    <div className="absolute top-1 right-1 z-10">
                        <AlertTriangle size={20} className="text-red-500 animate-bounce" />
                    </div>
                )}

                {isSelected && (
                    <div className="absolute inset-0 bg-blue-600/5 rounded-[inherit] pointer-events-none animate-pulse" />
                )}

                <div className="relative p-2 flex flex-col items-center justify-center h-full z-20">
                    <div className="flex flex-col items-center">
                        <span className="font-black uppercase tracking-tighter leading-none text-foreground opacity-80 text-[12px] mb-1">
                            {reservoirName || "배수지"}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black 
                                    ${isDanger ? "text-danger" : "text-foreground"}`}>
                                {mapLevel !== -1 ? displayLevel.toFixed(2) : isLevel ? levelPercent.toFixed(0) : displayFlowIn?.toFixed(2) ?? "---"}
                            </span>
                            <span className="text-[10px] font-bold text-muted">
                                {mapLevel !== -1 ? "m" : isLevel ? "%" : "m³/h"}
                            </span>
                        </div>
                    </div>

                    {/* 하단 게이지 바 */}
                    <div className="w-full mt-2 h-1 bg-muted/20 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isDanger ? "bg-red-500" : "bg-blue-500"}`}
                            style={{ width: `${Math.min(levelPercent, 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
