'use client'

import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import PredictionChart from '@/components/main/PredictionChart';
import ErrorFallback from '@/components/skeletons/ErrorFallback';
import PageFallback from '@/components/skeletons/PageFallback';
import useOptimization from '@/hooks/useOptimization';

export default function PumpSchedulePanel() {
  const { optimizationData, isLoading, error, loadOptimization } = useOptimization();

  return (
    <div className="flex-1">
      <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
          <div className="flex gap-2 items-center">
            <h2 className="text-xs lg:text-sm font-bold text-slate-800">최적화 스케줄링</h2>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col lg:flex-row gap-4">
          {/* Graph Section */}
          <div className={`h-70 md:h-full md:flex-3 flex flex-col mt-1 w-full transition-opacity ${!error ? "group-hover:opacity-80" : ""}`}>
            {isLoading ? (
              <PageFallback skeleton={<TailChartSkeleton />} />
            ) : error ? (
              <ErrorFallback error={error} onClick={() => loadOptimization()} />
            ) : (
              <PredictionChart
                data={optimizationData}
                labels={["예측 수위", "가동 펌프"]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


