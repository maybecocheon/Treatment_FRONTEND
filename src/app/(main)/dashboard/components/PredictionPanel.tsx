
'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import { RESERVOIRS } from '@/data/mockData';
import TailChart from '@/components/main/TailChart';
import { fetchPredictionData } from '@/fetchs/fetchPredictionData';
import { fetchFacilityAll } from '@/fetchs/fetchFacilityAll';

interface PredictionPanelProps {
  selectedReservoir: string;
  onReservoirChange: (name: string) => void;
}

export default function PredictionPanel({ selectedReservoir, onReservoirChange }: PredictionPanelProps) {
  const [reservoir, setReservoir] = React.useState<any>(null);
  const [rawChartData, setRawChartData] = useState<Array<{ time: string; actualValue: number | null; predictedValue: number }>>([]);
  const
  const [selectedRange, setSelectedRange] = useState("24h");

  // useEffect(() => {
  //   fetchFacilityAll();
  // }, [])

  useEffect(() => {
    fetchPredictionData({ setReservoir, setRawChartData, id: "10" });
  }, [selectedReservoir]);

  // 필터링 로직 (캐싱을 위해 useMemo 사용)
  const filteredData = useMemo(() => {
    if (!rawChartData) return [];

    const lastIndex = rawChartData.length;
    let dataLimit = 0;

    // 선택된 범위에 따라 데이터 자르기
    switch (selectedRange) {
      case "3h": dataLimit = 180; break;
      case "6h": dataLimit = 360; break;
      case "24h": dataLimit = 1440; break;
      default: dataLimit = rawChartData.length;
    }

    // 마지막부터 dataLimit 개수만큼 자르기
    return rawChartData.slice(Math.max(0, lastIndex - dataLimit)).filter(data => !data.actualValue);
  }, [rawChartData, selectedRange]);

  return (
    <div className="glass backdrop-blur-xl rounded-3xl p-3 lg:p-4 h-full flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xs lg:text-sm font-black text-slate-800">예측 대시보드</h2>
          <select
            value={selectedReservoir}
            onChange={(e) => onReservoirChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-[10px] lg:text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-bold"
          >
            {RESERVOIRS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
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

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
        <div className="flex-3 min-h-0">
          <div className="h-70 w-full">
          <TailChart chartData={filteredData || []} />
          </div>
          
          {/* <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillLevelLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.level} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={COLORS.level} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="fillDemandLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.demand} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.demand} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickMargin={4} />
              <YAxis yAxisId="left" stroke={COLORS.demand} fontSize={9} />
              <YAxis yAxisId="right" orientation="right" stroke={COLORS.level} fontSize={9} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '10px' }}
              />
              <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '5px' }} iconSize={8} />
              <ReferenceLine y={85} yAxisId="right" stroke={COLORS.peak} strokeDasharray="3 3" opacity={0.2} />
              <ReferenceLine y={25} yAxisId="right" stroke={COLORS.peak} strokeDasharray="3 3" opacity={0.2} />
              <Bar yAxisId="left" dataKey="demand" fill="url(#fillDemandLight)" name="용수 수요" barSize={10} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="level" stroke={COLORS.level} name="배수지 수위" strokeWidth={3} dot={false} />
              <Area yAxisId="right" type="monotone" dataKey="level" fill="url(#fillLevelLight)" stroke="none" />
            </ComposedChart>
          </ResponsiveContainer> */}
        </div>

        <div className="flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-200 flex flex-col justify-center gap-3 shrink-0">
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
  );
};
