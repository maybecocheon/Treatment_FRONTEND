'use client'

import React from 'react';
import { 
  Zap, ArrowLeft, Download, Play, 
  Battery, Clock, DollarSign, TrendingDown, Info, Activity
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Bar, Area
} from 'recharts';
import { useRouter } from 'next/navigation';
import { WaterSystemDatas } from "@/data/mockData"; // 데이터 경로에 맞춰 수정하세요

export default function EnergySchedulingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const reservoir = WaterSystemDatas.find(r => r.id === params.id) || WaterSystemDatas[2];

  // Mock 데이터: 시간대별 전기요금, 펌프 가동계획, 예상 수위 변화
  const schedulingData = Array.from({ length: 24 }).map((_, i) => {
    // 전기 요금 (경부하/중부하/최대부하 패턴)
    const price = [80, 75, 75, 75, 80, 90, 120, 160, 210, 230, 200, 180, 170, 190, 220, 240, 250, 220, 180, 150, 130, 110, 100, 90][i];
    
    // 펌프 가동 전략: 요금이 저렴한 0-7시, 21-24시에 집중 가동
    const pumpOn = (i >= 0 && i <= 6) || (i >= 21) ? 1 : (i === 12 ? 0.5 : 0);
    
    // 예상 수위 변화 (펌프 가동 시 상승, 미가동 시 수요에 의해 하락)
    const levelChange = pumpOn > 0 ? 0.3 * pumpOn : -0.15;
    const baseLevel = 2.5;
    const expectedLevel = Number((baseLevel + Math.sin(i / 3) * 0.8 + (pumpOn * 0.5)).toFixed(2));

    return {
      time: `${i}h`,
      price,
      pumpStatus: pumpOn * 100, // 시각화를 위해 수치화
      level: expectedLevel,
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
            대시보드로 돌아가기
          </button>
          <div className="flex gap-3">
            <button className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={18} /> 보고서 다운로드
            </button>
            <button className="flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
              <Play size={18} fill="currentColor" /> 최적 알고리즘 재실행
            </button>
          </div>
        </div>

        {/* 타이틀 섹션 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">AI Optimization</span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {reservoir.name} <span className="text-slate-400 font-light">운영 최적화</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium">분석 모델: Demand-Response 기반 펌프 스케줄링 (v2.4)</p>
        </div>

        {/* 요약 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: '에너지 절감액', value: '₩142,500', sub: '전일 대비 12% 감소', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: '펌프 효율(kWh/m³)', value: '0.42', sub: '최적 범위 내 가동중', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '최적 가동 시간', value: '11.5h', sub: '경부하 시간대 집중', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: '탄소 배출 저감', value: '24.8kg', sub: '에너지 절감분 환산', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${item.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                <item.icon className={`${item.color}`} size={24} />
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-2xl font-black text-slate-900 mb-1">{item.value}</p>
              <p className="text-xs font-bold text-slate-400">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* 메인 최적화 시뮬레이션 차트 */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-1">
                <Battery className="text-blue-500" fill="currentColor" size={24} /> 펌프 가동 및 수위 시뮬레이션
              </h3>
              <p className="text-sm text-slate-400 font-medium">전기요금 단가에 따른 펌프 운영 및 예상 수위 변화</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-100 rounded-full"></span><span className="text-xs font-bold text-slate-500">전기요금</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-600 rounded-full"></span><span className="text-xs font-bold text-slate-500">펌프 가동</span></div>
              <div className="flex items-center gap-2"><span className="w-8 h-1 bg-emerald-500 rounded-full"></span><span className="text-xs font-bold text-slate-500">예상 수위(m)</span></div>
            </div>
          </div>
          
          <div className="h-100 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={schedulingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis yAxisId="price" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis yAxisId="level" orientation="right" domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#10b981', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                />
                
                {/* 배경: 전기 요금 (Bar) */}
                <Bar yAxisId="price" dataKey="price" fill="#eff6ff" radius={[8, 8, 0, 0]} barSize={40} name="전기요금(원)" />
                
                {/* 펌프 가동 상태 (Bar) */}
                <Bar yAxisId="price" dataKey="pumpStatus" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={15} name="펌프가동량" />
                
                {/* 예상 수위 (Line) */}
                <Line 
                  yAxisId="level" 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
                  name="예상수위(m)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100">
              <h4 className="text-blue-900 font-black text-sm mb-2 flex items-center gap-2">
                <Info size={18} /> 알고리즘 분석 결과
              </h4>
              <p className="text-blue-800/70 text-sm leading-relaxed font-medium">
                오늘의 최적 전략은 **"야간 선급수"**입니다. 전기료가 가장 저렴한 02시~05시 사이에 펌프 가동률을 100%로 유지하여 수위를 4.2m까지 확보한 후, 요금이 비싼 주간 피크 시간대(14시~17시)에는 펌프 가동을 중단하고 자연 유하 방식으로 공급하는 것이 가장 경제적입니다.
              </p>
            </div>
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">자동 제어 모드</p>
                <h4 className="text-xl font-black">AI 스케줄 적용 중</h4>
              </div>
              <div className="flex h-12 w-24 bg-slate-800 rounded-2xl p-1 relative">
                <div className="absolute right-1 top-1 bottom-1 w-1/2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/50 flex items-center justify-center">
                  <span className="text-[10px] font-black italic">ON</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}