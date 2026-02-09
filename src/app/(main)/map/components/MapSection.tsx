'use client'

import MapLegend from './MapLegend';
import KakaoMap from './KakaoMap';

export default function MapSection() {
    return (
        <div className="flex-1 min-h-125 bg-white/60 rounded-[2.5rem] shadow-lg shadow-indigo-900/5 overflow-hidden relative border border-white">
            {/* 메인 지도 영역 */}
            <KakaoMap />

            {/* Floating 범례 */}
            <MapLegend />
        </div>
    )
}
