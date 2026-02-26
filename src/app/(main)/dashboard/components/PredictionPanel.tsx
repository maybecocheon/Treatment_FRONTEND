'use client'

import { useState } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import OpenDetail from '@/components/main/OpenDetail';
import ChartPanel from './ChartPanel';

export default function PredictionPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadPredictionData, filteredChartData, isLoading, error, selectedRange, setSelectedRange } = usePredictionData();

  return (
    <>
      <div className="flex-1">
        <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-1 shrink-0">
            <div className="flex gap-2 items-center">
              <h2 className="text-xs lg:text-sm font-bold text-foreground opacity-80">수요 예측</h2>
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
                  className={`z-10 text-[12px] px-4 py-1 rounded-2xl transition-all ${selectedRange === t
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted/10 text-muted hover:bg-muted/20"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <ChartPanel error={error} isLoading={isLoading} onClick={loadPredictionData} onOpen={() => setIsModalOpen(true)} data={filteredChartData} labels={["실제 수위", "예측 수위"]} mode="prediction" />
        </div>
      </div>
      {isModalOpen && <OpenDetail isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};