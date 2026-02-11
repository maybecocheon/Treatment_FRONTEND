'use client'

import { useEffect, useState } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import { selectedRangeAtom } from '@/atoms/uniAtoms';
import { useAtom } from 'jotai';
import { useFacilitiesData } from '@/hooks/useFacilitiesData';
import TailChart from '@/components/main/TailChart';
import TailSelect from '@/components/TailSelect';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import PageFallback from '@/components/skeletons/PageFallback';
import ErrorFallback from '@/components/skeletons/ErrorFallback';

export default function PredictionPanel() {
  const { facilities, loadFacilities, isLoading: facilitiesLoading } = useFacilitiesData();
  const [selectedCategory, setSelectedCategory] = useState<string>("A배수지");

  const { loadData, filteredChartData, resetRange, isLoading, error } = usePredictionData();
  const [selectedRange, setSelectedRange] = useAtom(selectedRangeAtom);

  useEffect(() => {
    loadFacilities();
    return () => resetRange();
  }, [])

  useEffect(() => {
    handleClick();
  }, [selectedCategory]);

  const handleClick = () => {
    const facilityId = facilities.filter(f => f.name === selectedCategory).map(f => f.facilityId);
    loadData(String(facilityId));
  }

  return (
    <div className="flex-1">
      <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
          <div className="flex flex-col md:flex-row gap-4">
            <h2 className="text-xs lg:text-sm font-black text-slate-800">예측 대시보드</h2>
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
          <TailSelect
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            option=
            {facilitiesLoading ? (
              <option disabled>로딩중...</option>
            ) : (
              facilities.filter(f => f.type === "배수지").map(f => <option key={f.facilityId} value={f.name}>{f.name}</option>)
            )}
          />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          <div className="h-70 md:h-full md:flex-3 flex flex-col mt-1">
            {
              isLoading ? (
                <PageFallback skeleton={<TailChartSkeleton />} />
              ) :
              error ? (
                <ErrorFallback error={error} onClick={handleClick} />
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
