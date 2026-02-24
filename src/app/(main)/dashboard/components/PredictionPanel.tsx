'use client'

import { useEffect, useMemo } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import { isModalOpenAtom, selectedFacilityIdAtom, selectedReservoirAtom } from '@/atoms/uniAtoms';
import { useAtomValue, useAtom, useSetAtom } from 'jotai';
import TailLineChart from '@/components/main/TailLineChart';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import PageFallback from '@/components/skeletons/PageFallback';
import ErrorFallback from '@/components/skeletons/ErrorFallback';
import { ArrowUpRight } from 'lucide-react';
import ReservoirDetails from '@/components/main/OpenDetail';

export default function PredictionPanel() {
  const selectedReservoir = useAtomValue(selectedReservoirAtom);
  const setSelectedFacilityId = useSetAtom(selectedFacilityIdAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);

  const { loadPredictionData, filteredChartData,
    isLoading, error, selectedRange, setSelectedRange } = usePredictionData(selectedReservoir?.facilityId ?? 0);

  useEffect(() => {
    if (selectedReservoir?.facilityId) {
      setSelectedFacilityId(selectedReservoir.facilityId);
    }
  }, [selectedReservoir?.facilityId, setSelectedFacilityId]);

  return (
    <>
      <div className="flex-1">
        <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
            <div className="flex gap-2 items-center">
              <h2 className="text-xs lg:text-sm font-bold text-slate-800">수요 예측</h2>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-1">
              {["3h", "6h", "12h"].map(t => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRange(t);
                  }}
                  className={`z-10 text-[12px] px-4 py-1 rounded-2xl transition-colors ${selectedRange === t ? "bg-sky-500 text-white shadow-md" : "bg-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`relative flex-1 flex flex-col lg:flex-row gap-4 group ${!error ? "hover:cursor-pointer" : "cursor-default"}`}
            onClick={!error ? () => setIsModalOpen(true) : undefined}
          >
            {!error && !isLoading && (
              <div className="absolute top-2 lg:-top-5 left-1/2 -translate-x-1/2 z-20 
                    opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                    transition-all duration-300 lg:translate-y-2 lg:group-hover:translate-y-0">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm text-white rounded-full shadow-lg">
                  <ArrowUpRight className="w-3 h-3 text-sky-400" />
                  <span className="text-[10px] lg:text-[11px] font-medium whitespace-nowrap">
                    <span className="lg:hidden">터치하여 상세 보기</span>
                    <span className="hidden lg:inline">클릭하여 상세 데이터 확인</span>
                  </span>
                </div>
              </div>
            )}

            <div className={`h-70 md:h-full md:flex-3 flex flex-col mt-1 w-full transition-opacity ${!error ? "group-hover:opacity-80" : ""}`}>
              {isLoading ? (
                <PageFallback skeleton={<TailChartSkeleton />} />
              ) : error ? (
                <ErrorFallback error={error} onClick={() => loadPredictionData()} />
              ) : (
                <TailLineChart
                  data={filteredChartData}
                  labels={["실 수요", "예측 수요"]}
                  mode="prediction"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ReservoirDetails />}
    </>
  );
};