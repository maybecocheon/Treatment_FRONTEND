'use client'

import { useState } from 'react';
import { WaterSystemData } from '@/types';
import PlantStatsBar from '@/app/(main)/map/PlantStatsBar';
import KakaoMap from '@/components/KakaoMap';
import ReservoirDetailsModal from '@/app/(main)/map/ReservoirDetailsModal';
import PlantTrendModal from '@/app/(main)/map/PlantTrendModal';

export default function PlantMap() {
    const [selectedReservoir, setSelectedReservoir] = useState<WaterSystemData | null>(null);
    const [showPlantTrend, setShowPlantTrend] = useState(false);

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">지도 기반 배수지 현황</h2>
                    <p className="text-slate-500 font-medium text-lg">실시간 모니터링 및 수위 예측</p>
                </div>
            </div>

            {/* 배수지 정보 */}
            <PlantStatsBar onStorageClick={() => setShowPlantTrend(true)} />

            {/* 맵 */}
            <div className="flex-1 bg-white rounded-4xl shadow-xl overflow-hidden relative border border-slate-200">
                <KakaoMap setSelectedReservoir={setSelectedReservoir} />

                {/* Floating Map Legend */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-5 rounded-1.5rem shadow-xl border border-gray-100 flex flex-col space-y-3 text-[11px] font-black uppercase tracking-widest text-slate-500">
                    <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-50"></span>
                        <span>정상 수위</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-50"></span>
                        <span>하한 미달</span>
                    </div>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <div className="flex items-center space-x-3">
                        <span className="w-6 h-0.5 border-t-2 border-dashed border-red-300"></span>
                        <span>관리 한계선</span>
                    </div>
                </div>
            </div>

            {/* 팝업 */}
            {selectedReservoir && (
                <ReservoirDetailsModal
                    reservoir={selectedReservoir}
                    onClose={() => setSelectedReservoir(null)}
                />
            )}
            {showPlantTrend && (
                <PlantTrendModal
                    onClose={() => setShowPlantTrend(false)}
                />
            )}
        </div>
    );
}
