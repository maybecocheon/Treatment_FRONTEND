'use client'

import { Factory } from "lucide-react";
import { useAtomValue } from "jotai";
import { mapLevelAtom } from "@/atoms/uniAtoms";
import { useEffect } from "react";
import { FacilityType } from "@/types/types";
import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import WaterLevelCard from "@/components/main/skeletons/WaterLevelCard";

export interface FacilityOverlay {
    facility: FacilityType;
    onClick: () => void;
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
            <div className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2">
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

    if (facility.type === "배수지") {
        // mapLevel이 9 이상일 때, 위험하지 않은 오버레이는 렌더링하지 않음
        if (mapLevel >= 9 && !(reservoir.level > reservoir.maxLevel * 0.9 || reservoir.level < reservoir.maxLevel * 0.4)) {
            return null;
        }

        return (
            <WaterLevelCard
                res={reservoir}
                mapLevel={mapLevel}
                onClick={onClick}
            />
        );
    }
}