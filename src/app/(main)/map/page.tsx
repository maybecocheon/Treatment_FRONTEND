import { Suspense } from "react";
import PlantStatsBar from "@/app/(main)/map/components/PlantStatsBar";
import Title from "@/components/main/Title";
import PageFallback from "@/components/loading/PageFallback";
import MapSkeleton from "@/app/(main)/map/components/skeletons/MapSkeleton";
import MapSection from "./components/MapSection";
import PlantStatsBarSkeleton from "./components/skeletons/PlantStatsBarSkeleton";

export default function MapPage() {
    return (
        <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
            {/* 1. 타이틀 */}
            <Title title="지도 기반 배수지 현황" subtitle="실시간 모니터링 및 수위 예측" />

            {/* 2. 맵, 정수장 정보 */}
            <Suspense fallback={<PageFallback skeleton={<div className="flex flex-col md:flex-row flex-1 gap-6 w-full h-full"><MapSkeleton /><PlantStatsBarSkeleton /></div>} />}>
                <div className="flex flex-col md:flex-row flex-1 gap-6 w-full h-full">
                    <MapSection />
                    <PlantStatsBar />
                </div>
            </Suspense>
        </div>
    );
}

