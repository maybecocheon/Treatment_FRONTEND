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
        <>
            {/* 메인 지도 영역 */}
            <KakaoMap setSelectedReservoir={setSelectedReservoir} />

            {/* Floating 범례 */}
            <MapLegend />

            {/* 배수지 클릭 모달 */}
            {selectedReservoir && (
                <ReservoirDetailsModal reservoir={selectedReservoir} onClose={() => setSelectedReservoir(null)} />
            )}
        </>
    )
}
