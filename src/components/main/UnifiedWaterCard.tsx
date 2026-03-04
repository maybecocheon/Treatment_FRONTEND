'use client'

import { useEffect, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import dayjs from "dayjs";
import { AlertTriangle, Loader2 } from "lucide-react";

import { selectedFacilityTypeAtom, selectedReservoirAtom, selectedReservoirIdAtom, timeSlideAtom } from "@/atoms/uniAtoms";
import { WaterWave } from "@/components/WaterWave";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";
import { ReservoirLevelType, SimulationType } from "@/types/types";

interface UnifiedWaterCardProps {
    res: ReservoirLevelType | SimulationType;
    mapLevel: number;
    isLevel?: boolean;
    isLoading?: boolean;
    status: string;
}

export default function UnifiedWaterCard({
    res,
    mapLevel,
    isLevel = true,
    isLoading = false,
    status
}: UnifiedWaterCardProps) {
    const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
    const setSelectedReservoirId = useSetAtom(selectedReservoirIdAtom);
    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const [timeSlide] = useAtom(timeSlideAtom);
    const mapUI = useMapUI();

    // 1. 초기화 로직
    useEffect(() => {
        return () => {
            setSelectedReservoir(null);
            setSelectedFacilityType("");
            setSelectedReservoirId(0);
        };
    }, [setSelectedReservoir, setSelectedFacilityType, setSelectedReservoirId]);

    // 2. 시뮬레이션 데이터 판단 로직
    const isSimulation = "chartData" in res;
    const resName = isSimulation ? (res as SimulationType).facilityName : (res as ReservoirLevelType).reservoirName;

    // 3. 현재 표시할 데이터 추출 (핵심)
    const activeData = useMemo(() => {
        if (!isSimulation) return res as ReservoirLevelType;

        const simRes = res as SimulationType;
        if (!timeSlide || !simRes.chartData) return simRes.chartData?.[0];

        const targetTime = dayjs(timeSlide);
        return simRes.chartData.find(data => dayjs(data.time).isSame(targetTime, 'minute')) || simRes.chartData[0];
    }, [res, isSimulation, timeSlide]);

    // 4. 표시 값 계산 (수위, 유입량, 위험여부)
    const displayLevel = isSimulation && "predictLevel" in activeData! ? activeData.predictLevel : (res as ReservoirLevelType).level;
    const displayFlowIn = isSimulation && "flowIn" in activeData! ? activeData.flowIn : (res as ReservoirLevelType).flowIn;

    const levelPercent = useMemo(() => {
        const max = res.maxLevel || 1;
        return (displayLevel / (max * 1.05)) * 100;
    }, [displayLevel, res.maxLevel]);

    const isDanger = useMemo(() => {
        if (isSimulation) return displayLevel >= res.maxLevel || displayLevel <= res.minLevel;
        const risk = (res as ReservoirLevelType).riskStatus;
        return risk === "low" || risk === "high";
    }, [isSimulation, displayLevel, res]);

    const isSelected = selectedReservoir?.facilityId === res.facilityId;

    // 5. 핸들러
    const handleClick = () => {
        if (status === "map" && mapUI) {
            mapUI.onOpen("배수지", res as ReservoirLevelType);
        } else if (!isSimulation) {
            setSelectedReservoir(res as ReservoirLevelType);
            setSelectedReservoirId(res.facilityId);
        }
    };

    if (isLoading) return (
        <div className="w-36 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-inner border border-card-border">
            <Loader2 className="w-5 h-5 text-slate-300 dark:text-slate-600 animate-spin" />
        </div>
    );

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
                <WaterWave levelPercent={levelPercent} danger={isDanger} />

                {isDanger && (
                    <div className="absolute top-1 right-1 z-10">
                        <AlertTriangle size={18} className="text-red-500 animate-bounce" />
                    </div>
                )}

                <div className="relative p-2 flex flex-col items-center justify-center h-full z-20">
                    <span className="font-black uppercase tracking-tighter leading-none text-foreground opacity-80 text-[11px] mb-1 truncate w-full text-center">
                        {resName || "배수지"}
                    </span>
                    <div className="flex items-baseline gap-0.5">
                        <span className={`text-xl font-black ${isDanger ? "text-danger" : "text-foreground"}`}>
                            {mapLevel !== -1 ? displayLevel.toFixed(2) : isLevel ? levelPercent.toFixed(0) : displayFlowIn?.toFixed(2) ?? "---"}
                        </span>
                        <span className="text-[9px] font-bold text-muted">
                            {mapLevel !== -1 ? "m" : isLevel ? "%" : "m³/h"}
                        </span>
                    </div>

                    {isLevel && (
                        <div className="w-full mt-1.5 h-1 bg-muted/20 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isDanger ? "bg-red-500" : "bg-blue-500"}`}
                                style={{ width: `${Math.min(levelPercent, 100)}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}