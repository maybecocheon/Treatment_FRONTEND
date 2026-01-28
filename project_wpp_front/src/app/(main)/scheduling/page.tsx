'use client'

import React from 'react';
import { 
  Zap, ArrowLeft, Download, Play, 
  Settings, Clock, Database, Activity, Info, 
  Droplet, Gauge, Timer, Percent
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Bar, Area, Legend
} from 'recharts';
import { useRouter } from 'next/navigation';

export default function WaterPlantControlPage() {
  const router = useRouter();

  // Mock 데이터: 시간대별 송수량, 펌프 가동률, 수조 잔량 등
  const controlData = Array.from({ length: 24 }).map((_, i) => {
    const isNight = i >= 0 && i <= 6;
    const isPeak = i >= 14 && i <= 17;
    
    // 1. 가동률 (%)
    const operationRate = isNight ? 95 : (isPeak ? 30 : 65);
    
    // 2. 예상 송수량 (m³/h) - 가동률에 비례
    const flowRate = Number((operationRate * 15.5).toFixed(0));
    
    // 3. 수조 잔량 (m³) - 송수량과 수요의 차이로 계산되는 시뮬레이션
    const storageLevel = Number((4000 + Math.sin(i / 4) * 500 + (isNight ? 800 : -600)).toFixed(0));

    return {
      time: `${i}h`,
      flowRate,        // 예상 송수량
      operationRate,   // 가동률
      storageLevel,    // 잔량 추이
    };
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-bold"
          >
            <div className="p-2 rounded-xl group-hover:bg-white transition-colors">
              <ArrowLeft size={20} />
            </div>
            이전 화면으로
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Settings size={18} /> 제어 설정
            </button>
            <button className="flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">
              <Play size={18} fill="currentColor" /> 자동 제어 모드 실행
            </button>
          </div>
        </div>

        {/* 타이틀 섹션 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">Live Control</span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              중앙 정수장 <span className="text-slate-400 font-light">제어 현황</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium">실시간 예측 수요 기반 송수 스케줄링 운영 중</p>
        </div>

        {/* 4대 핵심 지표 (송수량, 펌프, 가동률, 잔량) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: '실시간 송수량', value: '1,450', unit: 'm³/h', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '가동 펌프 수', value: '4/6', unit: 'Units', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: '평균 가동률', value: '72.4', unit: '%', icon: Percent, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: '수조 잔량', value: '4,280', unit: 'm³', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-4xl border border-slate-100 shadow-sm">
              <div className={`${item.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                <item.icon className={`${item.color}`} size={24} />
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{item.value}</span>
                <span className="text-slate-400 text-sm font-bold">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 메인 제어 차트 (송수량 + 가동률 + 잔량) */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-1">
                <Gauge className="text-blue-600" size={24} /> 통합 송수 제어 시뮬레이션
              </h3>
              <p className="text-sm text-slate-400 font-medium">향후 24시간 예상 송수량 및 잔량 변동 추이</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span><span className="text-xs font-bold text-slate-500">예상 송수량</span></div>
              <div className="flex items-center gap-2"><span className="w-8 h-1 bg-emerald-500 rounded-full"></span><span className="text-xs font-bold text-slate-500">잔량 추이(m³)</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-200 rounded-full"></span><span className="text-xs font-bold text-slate-500">가동률(%)</span></div>
            </div>
          </div>
          
          <div className="h-112.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={controlData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#10b981', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                />
                
                {/* 1. 예상 송수량 (Bar) */}
                <Bar yAxisId="left" dataKey="flowRate" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={35} name="송수량(m³/h)" />
                
                {/* 2. 가동률 (Area) */}
                <Area yAxisId="left" type="monotone" dataKey="operationRate" fill="#f1f5f9" stroke="#cbd5e1" name="가동률(%)" />
                
                {/* 3. 잔량 추이 (Line) */}
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="storageLevel" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={false}
                  name="잔량(m³)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
                <h4 className="text-slate-900 font-black text-lg mb-2">운영 효율성 브리핑</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  현재 송수 시스템은 예측 수요 대비 **105% 가동률**로 안정적인 용수를 공급하고 있습니다. 
                  야간 시간대 송수량을 증대시켜 정수장 수조 잔량을 최대치로 확보했으며, 
                  이를 통해 전력 단가가 높은 오후 시간대 펌프 부하를 **최대 40%까지 경감**할 수 있을 것으로 예측됩니다.
                </p>
             </div>
             <div className="flex gap-4">
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">System Status</p>
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-600 font-black">
                        OK
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Efficiency</p>
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center text-blue-600 font-black">
                        94%
                    </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}