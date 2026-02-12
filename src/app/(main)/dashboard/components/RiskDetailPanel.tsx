'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function RiskDetailPanel() {
  return (
    <div className="flex-1 h-full">
      <div className="bg-white backdrop-blur-sm border border-slate-200/50 rounded-2xl p-3 lg:p-4 h-full flex flex-col transition-all">
        
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <div className="w-1.5 h-3 bg-red-500 rounded-full"></div>
          <h2 className="text-xs lg:text-sm font-bold text-slate-700">운영 리스크 가중치</h2>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row min-h-0 gap-4">
          {/* Pie Chart Section */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-25">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{value: 79}, {value: 21}]}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#ef4444" /> {/* Red-500 */}
                  <Cell fill="#f1f5f9" /> {/* Slate-100 (배경) */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-red-600 leading-none">79</span>
              <span className="text-[8px] text-slate-400 uppercase font-bold mt-1">Score</span>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="flex-[1.5] flex flex-col justify-center min-h-25">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[{name: '수위', value: 80}, {name: '수질', value: 45}, {name: '펌프', value: 60}]} margin={{ left: -20, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={8}>
                  {[{name: '수위', value: 80}, {name: '수질', value: 45}, {name: '펌프', value: 60}].map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={entry.value > 70 ? '#ef4444' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 결과 요약 뱃지 스타일 */}
        <div className="mt-3 px-3 py-1.5 bg-red-50 rounded-lg border border-red-100 shrink-0">
          <p className="text-[10px] text-red-700 font-medium">
            <span className="font-bold mr-1">● 분석 결과:</span>
            위험 요인이 지배적입니다. 즉시 점검이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
};