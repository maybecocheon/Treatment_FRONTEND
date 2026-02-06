
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { RiskFactor } from '@/data/types';

interface Props {
  factors: RiskFactor[];
  totalScore: number;
}

export const RiskDetailPanel: React.FC<Props> = ({ factors, totalScore }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-3 lg:p-4 h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="text-xs lg:text-sm font-black text-slate-800 mb-2 shrink-0">운영 리스크 가중치</h2>
      
      <div className="flex-1 flex flex-col sm:flex-row min-h-0 gap-2">
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={factors}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
                paddingAngle={4}
                dataKey="value"
              >
                {factors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black text-slate-900 leading-none">{totalScore}</span>
            <span className="text-[8px] text-slate-400 uppercase font-black">Score</span>
          </div>
        </div>

        <div className="flex-[1.5] flex flex-col justify-center min-h-0 py-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={factors} margin={{ left: -10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={9} 
                width={70}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '9px' }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={10}>
                {factors.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={entry.color} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-2 p-2 bg-slate-50/50 rounded-xl border border-slate-100 shrink-0">
        <p className="text-[9px] text-slate-500 font-medium leading-tight">
          <span className="font-bold text-slate-800">결과:</span> {factors.sort((a,b) => b.value - a.value)[0].name} 요인 지배적.
        </p>
      </div>
    </div>
  );
};
