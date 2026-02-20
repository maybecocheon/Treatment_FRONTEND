'use client'

import { Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// 시간대별 펌프 가동 대수 더미 데이터 (실제 데이터로 교체 필요)
const pumpData = [
  { hour: '00', pumps: 3 }, { hour: '01', pumps: 3 }, { hour: '02', pumps: 3 },
  { hour: '03', pumps: 3 }, { hour: '04', pumps: 2 }, { hour: '05', pumps: 2 },
  { hour: '06', pumps: 1 }, { hour: '07', pumps: 1 }, { hour: '08', pumps: 1 },
  { hour: '09', pumps: 2 }, { hour: '10', pumps: 1 }, { hour: '11', pumps: 1 },
  { hour: '12', pumps: 1 }, { hour: '13', pumps: 1 }, { hour: '14', pumps: 1 },
  { hour: '15', pumps: 2 }, { hour: '16', pumps: 2 }, { hour: '17', pumps: 2 },
  { hour: '18', pumps: 2 }, { hour: '19', pumps: 1 }, { hour: '20', pumps: 1 },
  { hour: '21', pumps: 2 }, { hour: '22', pumps: 3 }, { hour: '23', pumps: 3 },
];

export default function PumpOptimization() {
  return (
    <div className="glass rounded-2xl p-6 transition-all h-full flex flex-col">
      {/* 1. 헤더 영역 */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shadow-inner">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800 leading-none uppercase tracking-tight">
              펌프 가동 최적화 현황
            </h3>
            <p className="text-[11px] text-slate-500 mt-1.5 font-bold tracking-tight">
              AI 기반 시간별 펌프 대수 제어
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md shadow-xs uppercase">
            평균 가동 대수
          </span>
          <div className="flex items-baseline gap-0.5 mt-1 text-blue-600">
            <span className="text-2xl font-black">1~3</span>
            <span className="text-sm font-bold">대</span>
          </div>
        </div>
      </div>

      {/* 2. 시간별 펌프 가동 대수 바 차트 */}
      <div className="w-full h-full bg-slate-50 rounded-xl p-3 border border-slate-100">
        <ResponsiveContainer width="100%" height="100%" minHeight={"100px"}>
          <BarChart data={pumpData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="hour" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              interval={2} // 2시간 간격으로 레이블 표시
            />
            <YAxis 
              allowDecimals={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              domain={[0, 3]} // 펌프 대수 0~3대
            />
            <Tooltip 
              cursor={{ fill: '#cbd5e1', opacity: 0.3 }} 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '8px', 
                fontSize: '12px' 
              }}
              labelStyle={{ color: '#334155', fontWeight: 'bold' }}
              itemStyle={{ color: '#3b82f6' }}
              formatter={(value: number, name: string, props: any) => [`${value} 대`, '펌프']}
            />
            <Bar 
              dataKey="pumps" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} // 상단 모서리 둥글게
              barSize={12} // 바 너비
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}