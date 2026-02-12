'use client'

import { useEffect } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import { selectedReservoirAtom } from '@/atoms/uniAtoms';
import { useAtomValue } from 'jotai';
import TailChart from '@/components/main/TailChart';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import PageFallback from '@/components/skeletons/PageFallback';
import ErrorFallback from '@/components/skeletons/ErrorFallback';

export default function PredictionPanel() {
  const selectedReservoir = useAtomValue(selectedReservoirAtom);

  const { loadData, filteredChartData, isLoading, error, selectedRange, setSelectedRange } = usePredictionData();

  useEffect(() => {
    loadData(String(selectedReservoir?.facilityId));
  }, [selectedReservoir]);

  return (
    <div className="flex-1">
      <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
          <h2 className="text-xs lg:text-sm font-bold text-slate-800">예측 대시보드</h2>
          <div className="flex gap-1">
            {["3h", "6h", "24h"].map(t => (
              <button
                key={t}
                onClick={() => setSelectedRange(t)}
                className={`text-[12px] px-4 py-1 rounded-2xl transition-colors ${selectedRange === t
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          <div className="h-70 md:h-full md:flex-3 flex flex-col mt-1">
            {
              isLoading ? (
                <PageFallback skeleton={<TailChartSkeleton />} />
              ) :
                error ? (
                  <ErrorFallback error={error} onClick={() => loadData(String(selectedReservoir?.facilityId))} />
                ) :
                  (<TailChart
                    time={filteredChartData.map(d => d.time || 0)}
                    data={filteredChartData.map(d => d.actualValue || 0)}
                    data2={filteredChartData.map(d => d.predictedValue || 0)}
                    data3={[1, 2, 3, 4, 5, 6]}
                    data4={[6, 1, 2, 5, 4, 5]}
                    label1="현재 수요"
                    label2="수요 예측"
                    label3="현재 수위"
                    label4="수위 예측"
                  />
                  )}
          </div>
        </div>
      </div>
    </div>
  );
};
