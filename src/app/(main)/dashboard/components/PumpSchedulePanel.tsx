'use client'

import { selectedReservoirAtom } from '@/atoms/uniAtoms';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import TailLineChart from '@/components/main/TailLineChart';
import ErrorFallback from '@/components/skeletons/ErrorFallback';
import PageFallback from '@/components/skeletons/PageFallback';
import useOptimization from '@/hooks/useOptimization';
import { useAtomValue } from 'jotai';

export default function PumpSchedulePanel() {
  const selectedReservoir = useAtomValue(selectedReservoirAtom);
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
              <TailLineChart
                data={optimizationData}
                labels={["펌프 대수", "예측 수위"]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


