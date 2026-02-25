'use client'

import { selectedFacilityTypeAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import { WaterWave } from "@/components/WaterWave";
import useModalSet from "@/hooks/useModalSet";
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
    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const { onOpen } = useModalSet();

    // 초기화
    useEffect(() => {
        return () => { setSelectedReservoir(null); setSelectedFacilityType(""); }
    }, []);

    // 배수지 상태
    const isSelected = selectedReservoir?.facilityId === res.facilityId;
    const levelPercent = (res.level / res.maxLevel) * 100;
    const isDanger = res.riskStatus === "low" || res.riskStatus === "high";

    if (isLoading)
        return <div className="w-40 h-20 flex items-center justify-center bg-slate-100 rounded-2xl shadow-inner">
            <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
        </div>

    return (
        <div
            onClick={() => status === "map" ? onOpen("배수지", res) : setSelectedReservoir(res)}
            key={res.facilityId}
            className={`flex-1 group cursor-pointer transition-all duration-300
                ${isSelected ? "scale-105" : "hover:-translate-y-1"}`}
        >
            <div className={`relative overflow-hidden w-36 h-20 rounded-xl lg:rounded-2xl 
                border-2 backdrop-blur-md transition-all duration-300 glass
                ${isSelected ?
                    (isDanger ?
                        "border-red-500 bg-red-50/80 ring-4 ring-red-500/20 shadow-red-200"
                        : "border-blue-600 bg-blue-50/80 ring-4 ring-blue-500/20 shadow-blue-200")
                    : (isDanger ?
                        "border-red-500" : "border-blue-400")
                }`}>

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
                        <span className="font-black uppercase tracking-tighter leading-none text-slate-700 text-[12px] mb-1">
                            {res.reservoirName}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black 
                                    ${isDanger ? "text-red-600" : "text-slate-700"}`}>
                                {mapLevel !== -1 ? res.level.toFixed(2) : isLevel ? levelPercent.toFixed(0) : res.flowIn?.toFixed(2) ?? "---"}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                                {mapLevel !== -1 ? "m" : isLevel ? "%" : "m³/h"}
                            </span>
                        </div>
                    </div>

                    {/* 하단 게이지 바 */}
                    {
                        isLevel &&
                        <div className="w-full mt-2 h-1 bg-slate-200/50 rounded-full overflow-hidden">
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