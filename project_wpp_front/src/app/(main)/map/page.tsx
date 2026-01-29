import { Suspense } from "react";
import PlantStatsBar from "@/app/(main)/map/components/PlantStatsBar";
import Title from "@/components/main/Title";
import PageFallback from "@/components/loading/PageFallback";
import MapSkeleton from "@/app/(main)/map/components/skeletons/MapSkeleton";
import TitleSkeleton from "@/components/skeletons/TitleSkeleton";
import PlantStatsBarSkeleton from "@/app/(main)/map/components/skeletons/PlantStatsBarSkeleton";
import MapSection from "./components/MapSection";

export default function MapPage() {
    return (
        <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
            {/* 헤더 영역 */}
            <Suspense fallback={<PageFallback skeleton={<div className="space-y-6"><TitleSkeleton /><PlantStatsBarSkeleton /></div>} />}>
                <Title title="지도 기반 배수지 현황" subtitle="실시간 모니터링 및 수위 예측" />

                {/* 배수지 정보 상단 바 */}
                <PlantStatsBar />
            </Suspense>

            {/* 메인 지도 영역 */}
            <div className="flex-1 w-full h-full min-h-125 bg-white/60 rounded-[2.5rem] shadow-lg shadow-indigo-900/5 overflow-hidden relative border border-white">
                <Suspense fallback={<MapSkeleton />}>
                    <MapSection />
                </Suspense>
            </div>
        </div>
    );
}

