import KPICardRow from "./components/KPICardRow";
import PredictionPanel from "./components/PredictionPanel";
import RiskEventPanel from "./components/RiskEventPanel";
import PumpSchedulePanel from "./components/PumpSchedulePanel";
import RiskDetailPanel from "./components/RiskDetailPanel";
import { Suspense } from "react";
import PageFallback from "@/components/loading/PageFallback";
import KPICardRowSkeleton from "./skeletons/KPICardRowSkeleton";

export default function DashboardPage() {

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 w-full flex-1">

        {/* 왼쪽 섹션 */}
        <div className="lg:col-span-8 flex flex-col gap-2">

          {/* Row 1: 현재 상태 요약 (KPI Cards) */}
          <Suspense fallback={<PageFallback skeleton={<KPICardRowSkeleton />} />}>
            <KPICardRow />
          </Suspense>

          {/* Row 3: 예측 */}
          <PredictionPanel />

          {/* Row 4: 펌프 스케줄링 */}
          <PumpSchedulePanel />

        </div>

        {/* 오른쪽 섹션 */}
        <div className="lg:col-span-4 flex flex-col gap-2 mb-4 md:mb-0">

          {/* Row 4: 리스크 이벤트 */}
          <RiskEventPanel />

          {/* Row 5: 리스크 상세 점수 */}
          <RiskDetailPanel />

        </div>
      </div>
    </div>
  )
}