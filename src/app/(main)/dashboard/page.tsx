import WaterLevelPanel from "./components/WaterLevelPanel";
import PredictionPanel from "./components/PredictionPanel";
import RiskEventPanel from "./components/RiskEventPanel";
import PumpSchedulePanel from "./components/PumpSchedulePanel";
import RiskDetailPanel from "./components/RiskDetailPanel";
import { Suspense } from "react";
import PageFallback from "@/components/skeletons/PageFallback";
import WaterLevelPanelSkeleton from "./skeletons/WaterLevelPanelSkeleton";

export default function DashboardPage() {

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 w-full mb-2">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 w-full h-full flex-1">

          {/* 왼쪽 섹션 */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            {/* Row 1: 현재 수위 */}
            <Suspense fallback={<PageFallback skeleton={<WaterLevelPanelSkeleton />}/>}>
              <WaterLevelPanel />
            </Suspense>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="lg:col-span-5 lg:flex-row flex flex-col gap-2">
            {/* Row 5: 리스크 상세 점수 */}
            <RiskDetailPanel />

            {/* Row 4: 리스크 이벤트 */}
            <RiskEventPanel />

          </div>

        </div>
      </div>

      <div className="flex-1 flex flex-col w-full lg:grid lg:grid-cols-2 gap-2">
        {/* 왼쪽 섹션 */}
        <div className="lg:col-span-1 flex flex-col gap-2">


          {/* Row 3: 예측 */}
          <PredictionPanel />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="lg:col-span-1 flex flex-col gap-2 mb-4 md:mb-0">



          {/* Row 4: 펌프 스케줄링 */}
          <PumpSchedulePanel />

        </div>
      </div>
    </div>
  )
}