"use client"

import { useState } from "react";
import { WaterSystemData } from "@/data/types";
import PlantStatsBar from "@/app/(main)/map/components/PlantStatsBar";
import KakaoMap from "@/app/(main)/map/components/KakaoMap";
import ReservoirDetailsModal from "@/app/(main)/map/components/ReservoirDetailsModal";
import PlantTrendModal from "@/app/(main)/map/components/PlantTrendModal";

export default function PlantMap() {
    const [selectedReservoir, setSelectedReservoir] = useState<WaterSystemData | null>(null);
    const [showPlantTrend, setShowPlantTrend] = useState(false);

    return (
        <div className="flex flex-col min-h-[calc(100vh-100px)]">
            {/* 헤더 영역 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">지도 기반 배수지 현황</h2>
                    <p className="text-slate-500 font-medium text-lg">실시간 모니터링 및 수위 예측</p>
                </div>
            </div>

            {/* 배수지 정보 */}
            <PlantStatsBar onStorageClick={() => setShowPlantTrend(true)} />

            {/* 맵 */}
            <div className="flex-1 min-h-125 mt-6 bg-white rounded-4xl shadow-xl overflow-hidden relative border border-slate-200">
                <KakaoMap setSelectedReservoir={setSelectedReservoir} />

                {/* Floating Map Legend */}
                <div className="absolute bottom-6 right-6 z-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                        <span className="text-[10px] font-bold text-slate-300">정상 운영중</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-300">수위 부족 경고</span>
                    </div>
                </div>
            </div>

            {/* 배수지 클릭 모달 */}
            {selectedReservoir && (
                <ReservoirDetailsModal
                    reservoir={selectedReservoir}
                    onClose={() => setSelectedReservoir(null)}
                />
            )}

            {/* 정수장 클릭 모달 */}
            {showPlantTrend && (
                <PlantTrendModal
                    onClose={() => setShowPlantTrend(false)}
                />
            )}
        </div>
    );
}