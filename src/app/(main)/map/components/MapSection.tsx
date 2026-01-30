'use client'

import { useState } from 'react';
import { WaterSystemData } from '@/data/types';
import MapLegend from './MapLegend';
import ReservoirDetailsModal from './ReservoirDetailsModal';
import KakaoMap from './KakaoMap';

export default function MapSection() {
    // 배수지 클릭 모달 상태
    const [selectedReservoir, setSelectedReservoir] = useState<WaterSystemData | null>(null);
    return (
        <div className="flex-1 w-full h-full min-h-125 bg-white/60 rounded-[2.5rem] shadow-lg shadow-indigo-900/5 overflow-hidden relative border border-white">
            {/* 메인 지도 영역 */}
            <KakaoMap setSelectedReservoir={setSelectedReservoir} />

            {/* Floating 범례 */}
            <MapLegend />

            {/* 배수지 클릭 모달 */}
            {selectedReservoir && (
                <ReservoirDetailsModal reservoir={selectedReservoir} onClose={() => setSelectedReservoir(null)} />
            )}
        </div>
    )
}
