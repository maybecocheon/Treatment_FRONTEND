'use client'

import { AlertTriangle, Factory } from "lucide-react";
import { WaterWave } from "./WaterWave";
import { useAtomValue } from "jotai";
import { mapLevelAtom } from "@/atoms/uniAtoms";
import { useEffect } from "react";
import { FacilityType } from "@/types/types";
import { useReservoirLevel } from "@/hooks/useReservoirLevel";

export interface FacilityOverlay {
    facility: FacilityType;
    onClick?: () => void;
}

export default function FacilityOverlay({ facility, onClick }: FacilityOverlay) {
    // 지도 레벨
    const mapLevel = useAtomValue(mapLevelAtom);

    // 수위 레벨 얻기
    const { reservoirLevels, loadLevels } = useReservoirLevel();

    useEffect(() => {
        loadLevels();
    }, [])

    // 1. 정수장
    if (facility.type === "정수장") {
        return (
            <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-2" onClick={onClick}>
                <div className="relative">
                    <div className="absolute inset-0 blur-xl opacity-40 animate-pulse" />
                    <div className="relative bg-white/50 border-2 border-slate-700 p-4 rounded-full shadow-2xl backdrop-blur-md">
                        <Factory className="w-8 h-8 text-slate-700" />
                    </div>
                </div>
                <div className="mt-2 bg-slate-700/70 text-white text-[10px] px-3 py-1 rounded-full font-semibold">
                    {facility.name || "광역 정수장"}
                </div>
            </div>
        );
    }

    // 2. 배수지
    if (!reservoirLevels) return null;

    const reservoir = reservoirLevels.find(r => r.facilityId === facility.facilityId);

    if (!reservoir) return null;

    const isDanger = reservoir.level > reservoir.maxLevel * 0.9 || reservoir.level < reservoir.maxLevel * 0.4;
    const levelPercent = (reservoir.level / reservoir.maxLevel) * 100;

    if (facility.type === "배수지") {
        // mapLevel이 9 이상일 때, 위험(isDanger)하지 않은 오버레이는 렌더링하지 않음
        if (mapLevel >= 9 && !isDanger) {
            return null;
        }

        return (
            <div
                onClick={onClick}
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
            >
                <div className={`relative ${mapLevel >= 8 ? "w-14 h-14 rounded-full" : "w-36 rounded-2xl"} 
          overflow-hidden border-2 shadow-xl backdrop-blur-md transition-all duration-300 
          ${isDanger ? "bg-white/50 border-red-500" : "bg-white/50 border-blue-400"}`}>

                    {/* 수위 따라 배경 채우기 */}
                    <WaterWave levelPercent={levelPercent} danger={isDanger} />

                    {/* 경고 */}
                    {isDanger && (
                        <div className="absolute top-1 right-1 z-10">
                            <AlertTriangle size={mapLevel >= 8 ? 16 : 20} className="text-red-500 animate-bounce" />
                        </div>
                    )}

                    <div className="relative p-3 flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                            <span className={`font-black uppercase tracking-tighter text-slate-700 leading-none ${mapLevel >= 8 ? "text-[14px]" : "text-[12px] mb-1"}`}>
                                {mapLevel >= 8 ? reservoir.level.toFixed(1) : reservoir.reservoirName}
                            </span>

                            {/* 8레벨 미만일 때만 상세 수위 표시 */}
                            {mapLevel < 8 && (
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-xl font-black ${isDanger ? "text-red-600" : "text-slate-700"}`}>
                                        {reservoir.level.toFixed(1)}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">m</span>
                                </div>
                            )}
                        </div>

                        {/* 하단 게이지 바 */}
                        {
                            mapLevel < 8 && (
                                <div className="mt-2 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
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
}