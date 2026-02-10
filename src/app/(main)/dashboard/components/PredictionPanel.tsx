'use client'

import { useEffect, useState } from 'react';
import { usePredictionData } from '@/hooks/usePredictionData';
import { selectedRangeAtom } from '@/atoms/uniAtoms';
import { useAtom } from 'jotai';
import { useFacilitiesData } from '@/hooks/useFacilitiesData';
import TailChart from '@/components/main/TailChart';
import TailSelect from '@/components/TailSelect';

export default function PredictionPanel() {
  const { facilities, loadFacilities } = useFacilitiesData();
  const [selectedCategory, setSelectedCategory] = useState<string>("A배수지");

  const { loadData, filteredChartData, resetRange } = usePredictionData();
  const [selectedRange, setSelectedRange] = useAtom(selectedRangeAtom);

  useEffect(() => {
    loadFacilities();
    return () => resetRange();
  }, [])

  useEffect(() => {
    const facilityId = facilities.filter(f => f.name === selectedCategory).map(f => f.facilityId);
    loadData(String(facilityId));
  }, [selectedCategory]);

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
            option={facilities.filter(f => f.type === "배수지").map(f => <option key={f.facilityId} value={f.name}>{f.name}</option>)}
          />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          <div className="h-70 md:h-full md:flex-3 flex flex-col mt-1">
            <TailChart
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
          </div>

          <div className="md:flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-200 flex flex-col justify-center gap-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Stability</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-600 font-bold">관압 충족 확률</span>
                  <span className="text-sky-600 font-black">94.2%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full shadow-sm" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-600 font-bold">공급 여유도</span>
                  <span className="text-emerald-600 font-black">+12,4k</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <p className="text-[9px] text-rose-600 font-bold">
                    ⚠️ 6h 후 관압 미달 확률 38%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
