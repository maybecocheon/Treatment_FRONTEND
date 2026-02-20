'use client'

import KakaoMap from './KakaoMap'
import MapControl from './MapControl'
import MapLegend from './MapLegend'
import ReservoirDetails from '@/components/main/OpenDetail'
import { useAtomValue } from 'jotai';
import { isModalOpenAtom, mapDetailOpenAtom } from '@/atoms/uniAtoms';

export default function MapSection() {
    const mapDetailOpen = useAtomValue(mapDetailOpenAtom);
    const isModalOpen = useAtomValue(isModalOpenAtom);

    return (
        <>
            <div className={`h-full w-full ${mapDetailOpen ? "col-span-8" : "col-span-12"} flex-1 min-h-125 glass overflow-hidden relative rounded-4xl`}>
                {/* 메인 지도 영역 */}
                <KakaoMap />

                {/* 지도 확대/축소 */}
                <MapControl />

                {/* Floating 범례 */}
                <MapLegend />
            </div>
            {mapDetailOpen && (
                <div className="col-span-4 h-full rounded-4xl">
                    <ReservoirDetails />
                </div>
            )}
            {isModalOpen && <ReservoirDetails />}
        </>
    )
}
