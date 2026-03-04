'use client'

import { useState } from "react";
import useOptimization from "@/hooks/useOptimization";
import ChartPanel from "./ChartPanel";
import OpenDetail from "@/components/main/OpenDetail";
import FetchingSpinner from "@/components/main/FetchingSpinner";

export default function PumpSchedulePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { optimizationData, isLoading, isFetching, error, loadOptimization } = useOptimization();

  return (
    <>
      <div className="flex-1 relative">
        <FetchingSpinner isFetching={isFetching && !isLoading} />
        <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
            <div className="flex gap-2 items-center">
              <h2 className="text-xs lg:text-sm font-bold text-foreground opacity-80">최적화 스케줄링</h2>
            </div>
          </div>

          <ChartPanel error={error} isLoading={isLoading} onClick={loadOptimization} onOpen={() => setIsModalOpen(true)} data={optimizationData} labels={["예측 수위", "가동 펌프"]} />
        </div>
      </div>
      {isModalOpen && <OpenDetail isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};


