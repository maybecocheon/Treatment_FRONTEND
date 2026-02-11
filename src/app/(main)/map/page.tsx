import { Suspense } from "react";
import PlantStatsBar from "@/app/(main)/map/components/PlantStatsBar";
import Title from "@/components/main/Title";
import PageFallback from "@/components/skeletons/PageFallback";
import MapSkeleton from "@/app/(main)/map/components/skeletons/MapSkeleton";
import MapSection from "./components/MapSection";

export default function MapPage() {
    return (
        <div className="flex flex-col h-full gap-4 md:p-4">
            {/* 1. 타이틀 */}
            <Title title="지도 기반 배수지 현황" subtitle="실시간 모니터링 및 수위 예측" />

            {/* 2. 맵, 정수장 정보 */}
            <div className="flex flex-col md:flex-row gap-4 h-full">
                <Suspense fallback={<PageFallback skeleton={<MapSkeleton />} />}>
                    <MapSection />
                </Suspense>
                <PlantStatsBar />
            </div>
        </div>
    );
}

