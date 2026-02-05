
import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { PumpScheduleItem } from '@/data/types';
import { COLORS } from '@/data/mockData';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  schedule: PumpScheduleItem[];
}

export const PumpSchedulePanel: React.FC<Props> = ({ schedule }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-3 lg:p-4 h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 shrink-0">
        <h2 className="text-xs lg:text-sm font-black text-slate-800 flex items-center gap-2">
          <div className="p-1.5 bg-sky-100 text-sky-600 rounded-xl border border-sky-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          AI 펌프 스케줄 최적화
        </h2>
        <div className="flex items-center gap-3 text-[9px] font-bold">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            <span className="text-slate-500">ECO</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            <span className="text-slate-500">PEAK</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-4 min-h-0">
        {/* Graph Section */}
        <div className="lg:col-span-2 min-h-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={schedule} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pumpGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tick={{ fill: '#64748b' }} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={9} tick={{ fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '10px' }}
              />
              <Area yAxisId="left" type="step" dataKey="level" stroke="none" fill="#f0f9ff" />
              <Bar yAxisId="left" dataKey="pumpOutput" fill="url(#pumpGradLight)" name="출력" barSize={10} radius={[4, 4, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="level" stroke={COLORS.level} name="예측 수위" strokeWidth={3} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="demand" stroke={COLORS.demand} name="예측 수요" strokeWidth={2} dot={false} strokeDasharray="4 4" opacity={0.3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-2 min-h-0 shrink-0">
          <div className="rounded-[2.5rem] p-6 relative overflow-hidden group flex flex-col gap-5">
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 relative">
                <div className="p-2 glass bg-blue-100/60 rounded-xl text-blue-600">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="text-base font-black text-blue-950 tracking-tight">스케줄 적용 시뮬레이션</h4>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-800">배수지 수위 안정성</p>
                    <p className="text-[10px] text-slate-500 leading-tight">08시 최저 수위 <span className="text-blue-600 font-bold">38%</span> (하한 25% 대비 안전)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-800">최소 관압 충족률</p>
                    <p className="text-[10px] text-slate-500 leading-tight">24시간 관압 충족 비율 <span className="text-blue-600 font-bold">97.4%</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/50 border border-rose-100/50">
                  <AlertTriangle size={16} className="text-rose-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-rose-900">운영 리스크 알림</p>
                    <p className="text-[10px] text-rose-700 leading-tight">저녁 피크 시 예비율 감소 주의 필요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


