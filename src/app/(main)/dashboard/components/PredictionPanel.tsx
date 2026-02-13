'use client'

import { useEffect } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import { isModalOpenAtom, selectedFacilityIdAtom, selectedReservoirAtom } from '@/atoms/uniAtoms';
import { useAtomValue, useSetAtom } from 'jotai';
import TailChart from '@/components/main/TailAreaChart';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import PageFallback from '@/components/skeletons/PageFallback';
import ErrorFallback from '@/components/skeletons/ErrorFallback';
import ReservoirDetailsModal from '../../map/components/ReservoirDetailsModal';

export default function PredictionPanel() {
  const selectedReservoir = useAtomValue(selectedReservoirAtom);
  const setSelectedFacilityId = useSetAtom(selectedFacilityIdAtom);
  const setIsModalOpen = useSetAtom(isModalOpenAtom);

  const { loadData, filteredChartData, isLoading, error, selectedRange, setSelectedRange } = usePredictionData();

  useEffect(() => {
    if (selectedReservoir?.facilityId) {
      loadData(selectedReservoir.facilityId);
      setSelectedFacilityId(selectedReservoir.facilityId);
    }
  }, [selectedReservoir, loadData]);

  return (
    <>
      <div 
        className="flex-1 cursor-pointer" 
        onClick={() => setIsModalOpen(true)}
      >
        <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
            <h2 className="text-xs lg:text-sm font-bold text-slate-800">예측 대시보드</h2>
            
            {/* 버튼 영역 */}
            <div className="flex gap-1">
              {["3h", "6h", "24h"].map(t => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRange(t);
                  }}
                  className={`z-10 text-[12px] px-4 py-1 rounded-2xl transition-colors ${
                    selectedRange === t ? "bg-sky-500 text-white shadow-md" : "bg-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-4 pointer-events-none"> 
            <div className="h-70 md:h-full md:flex-3 flex flex-col mt-1">
              {isLoading ? (
                <PageFallback skeleton={<TailChartSkeleton />} />
              ) : error ? (
                <ErrorFallback error={error} onClick={() => selectedReservoir?.facilityId && loadData(selectedReservoir?.facilityId)} />
              ) : (
                <TailChart
                  time={filteredChartData.map(d => d.time || 0)}
                  data1={filteredChartData.map(d => d.actualValue || 0)}
                  data2={filteredChartData.map(d => d.predictedValue || 0)}
                  data3={[1, 2, 3, 4, 5, 6]}
                  data4={[6, 1, 2, 5, 4, 5]}
                  labels={["현재 수요", "수요 예측", "현재 수위", "수위 예측"]}
                  units={[" m³/h", " m³/h", " m", " m"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedReservoir?.facilityId && <ReservoirDetailsModal />}
    </>
  );
};