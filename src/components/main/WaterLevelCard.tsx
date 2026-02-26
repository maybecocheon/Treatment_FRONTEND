'use client'

import { selectedFacilityTypeAtom, selectedReservoirAtom, selectedReservoirIdAtom } from "@/atoms/uniAtoms";
import { WaterWave } from "@/components/WaterWave";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";
import { ReservoirLevelType } from "@/types/types";
import { useAtom, useSetAtom } from "jotai";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface WaterLevelCardProps {
    res: ReservoirLevelType;
    mapLevel: number;
    isLevel?: boolean;
    isLoading: boolean;
    status: string,
}

export default function WaterLevelCard({ res, mapLevel, isLevel = true, isLoading = false, status }: WaterLevelCardProps) {
    // 데이터
    const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
    const setSelectedReservoirId = useSetAtom(selectedReservoirIdAtom);
    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const mapUI = useMapUI();

    // 초기화
    useEffect(() => {
        return () => { setSelectedReservoir(null); setSelectedFacilityType(""); setSelectedReservoirId(0); }
    }, []);

    // 배수지 상태
    const isSelected = selectedReservoir?.facilityId === res.facilityId;
    const levelPercent = (res.level / (res.maxLevel * 1.05)) * 100;
    const isDanger = res.riskStatus === "low" || res.riskStatus === "high";

    if (isLoading)
        return <div className="w-40 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-inner">
            <Loader2 className="w-5 h-5 text-slate-300 dark:text-slate-600 animate-spin" />
        </div>

    return (
        <div
            onClick={() => {
                if (status === "map" && mapUI) {
                    mapUI.onOpen("배수지", res);
                } else {
                    setSelectedReservoir(res);
                    setSelectedReservoirId(res.facilityId);
                }
            }}
            key={res.facilityId}
            className={`flex-1 group cursor-pointer transition-all duration-300
                ${isSelected ? "scale-110" : "hover:-translate-y-1"}`}
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
                            {res.reservoirName}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black 
                                    ${isDanger ? "text-danger" : "text-foreground"}`}>
                                {mapLevel !== -1 ? res.level.toFixed(2) : isLevel ? levelPercent.toFixed(0) : res.flowIn?.toFixed(2) ?? "---"}
                            </span>
                            <span className="text-[10px] font-bold text-muted">
                                {mapLevel !== -1 ? "m" : isLevel ? "%" : "m³/h"}
                            </span>
                        </div>
                    </div>

                    {/* 하단 게이지 바 */}
                    {
                        isLevel &&
                        <div className="w-full mt-2 h-1 bg-muted/20 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isDanger ? "bg-red-500" : "bg-blue-500"}`}
                                style={{ width: `${Math.min(levelPercent, 100)}%` }}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}