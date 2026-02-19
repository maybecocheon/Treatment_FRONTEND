'use client'

import MapLegend from './MapLegend';
import KakaoMap from './KakaoMap';
import MapControl from './MapControl';

export default function MapSection() {
    return (
        <div className="flex-1 min-h-125 glass rounded-[2.5rem] overflow-hidden relative">
            {/* 메인 지도 영역 */}
            <KakaoMap />

            {/* 지도 확대/축소 */}
            <MapControl />

            {/* Floating 범례 */}
            <MapLegend />
        </div>
    )
}
