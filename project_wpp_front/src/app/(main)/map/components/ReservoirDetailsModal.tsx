'use client'

import { WaterSystemData } from "@/data/types";
import { AlertCircle, ArrowDownRight, BarChart3, Droplets, Info, TrendingUp, Waves, X, Zap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ReservoirDetailsModal({ reservoir, onClose }: { reservoir: WaterSystemData; onClose: () => void; }) {
    // 차트 데이터 가공 로직 동일
    const chartData = reservoir.actualDemand?.map((actual, idx: number) => ({
        time: `${idx * 4}h`,
        실제: actual,
        예측: reservoir.predictedDemand?.[idx]
    })) || [];

    const costChartData = reservoir.hourlyCostBaseline!.map((baseline, idx) => ({
        time: `${idx * 4}h`,
        기존비용: baseline,
        최적화비용: reservoir.hourlyCostOptimized![idx]
    }));

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
            <div className="bg-white rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
                
                {/* 헤더 */}
                <div className="bg-slate-900 px-6 py-5 md:px-10 md:py-8 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-2xl">
                            <Droplets className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                {reservoir.name} 상세 분석 리포트
                            </h3>
                            <p className="text-slate-400 text-xs md:text-sm font-medium">실시간 데이터 기반 수위 및 에너지 최적화 분석</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/5">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Scroll Area */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50/30">
                    
                    {/* 상단 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {/* 현재 수위 카드 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Waves size={14} className="text-blue-500" /> 현재 수위 현황
                            </p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${reservoir.currentLevel! < reservoir.minLevel! ? 'text-red-500' : 'text-slate-900'}`}>
                                        {reservoir.currentLevel?.toFixed(1)}
                                    </span>
                                    <span className="text-slate-400 font-bold text-lg whitespace-nowrap">/ {reservoir.maxLevel}m</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">상태</p>
                                    <p className={`text-xs font-black ${reservoir.currentLevel! < reservoir.minLevel! ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {reservoir.currentLevel! < reservoir.minLevel! ? '주의' : '정상'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI 정확도 카드 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <BarChart3 size={14} className="text-indigo-500" /> AI 예측 신뢰도
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-4xl font-black text-slate-900">{reservoir.accuracy}%</span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${reservoir.accuracy}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* 절감 요약 카드 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sm:col-span-2 lg:col-span-1">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Zap size={14} className="text-amber-500" /> 예상 비용 절감율
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                                    <ArrowDownRight size={24} strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-slate-900">{reservoir.expectedSavingsPercent}%</span>
                                    <p className="text-[10px] text-amber-600 font-bold">최적화 시뮬레이션 결과</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메인 분석 영역 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* 24시간 수요량 추이 차트 */}
                        <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-emerald-500" /> 24시간 수요 추이
                                </h4>
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">실제</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-400 rounded-full"></span><span className="text-[10px] font-bold text-slate-500">예측</span></div>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                        <Line type="monotone" dataKey="실제" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                                        <Line type="monotone" dataKey="예측" stroke="#f87171" strokeDasharray="6 6" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 에너지 비용 분석 차트 */}
                        <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Zap size={20} className="text-amber-500" /> 시간대별 비용 비교
                                </h4>
                                <div className="bg-amber-50 px-3 py-1 rounded-lg text-[10px] font-black text-amber-600">UNIT: KRW/H</div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={costChartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="기존비용" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={24} />
                                        <Bar dataKey="최적화비용" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* 하단 시스템 메시지 영역 */}
                    <div className="mt-8 flex flex-col md:flex-row gap-6">
                        {(reservoir.currentLevel! < reservoir.minLevel!) && (
                            <div className="flex-1 bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
                                <AlertCircle className="text-red-500 shrink-0 w-6 h-6" />
                                <div>
                                    <p className="text-sm font-bold text-red-800 mb-1">경고</p>
                                    <p className="text-xs text-red-600 leading-relaxed font-medium">{reservoir.name}의 현재 수위가 최저 수위를 아래로 떨어졌습니다.</p>
                                </div>
                            </div>
                        )}
                        <div className="flex-1 bg-amber-50/50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                <Info size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 mb-1">에너지 최적화 가이드</p>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    심야 시간대(00-08시)의 저렴한 전력 단가를 활용하여 송수량을 <strong>20% 상향 조정</strong>할 것을 권장합니다. 이를 통해 월간 약 {(reservoir.expectedSavingsPercent! * 1.5).toFixed(0)}만원의 운영비를 절감할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}