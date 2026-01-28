'use client'

import { WaterSystemData } from "@/data/types";
import { BarChart3, Droplets, TrendingUp, Waves, X, ArrowRight, AlertTriangle, Zap } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRouter } from "next/navigation";

export default function ReservoirDetailsModal({ reservoir, onClose }: { reservoir: WaterSystemData; onClose: () => void; }) {
    const router = useRouter();

    const chartData = reservoir.basePattern?.map((_, idx) => ({
        time: `${idx}h`,
        base: reservoir.basePattern?.[idx] || 0,
        daily: reservoir.dailyForecast?.[idx] || 0,
        recal: reservoir.recalculation?.[idx] || 0,
    })) || [];

    // 수위 위험 상태 체크
    const isLevelCritical = reservoir.currentLevel! < reservoir.minLevel!;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6">
            <div className="bg-white rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">

                {/* 헤더 */}
                <div className={`px-6 py-5 md:px-10 md:py-8 flex justify-between items-center transition-colors duration-500 ${isLevelCritical ? 'bg-red-600' : 'bg-slate-900'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isLevelCritical ? 'bg-white/20' : 'bg-blue-500/20'}`}>
                            <Droplets className={`${isLevelCritical ? 'text-white' : 'text-blue-400'} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                {reservoir.name} {isLevelCritical && "(수위 경고)"}
                            </h3>
                            <p className={`${isLevelCritical ? 'text-red-100' : 'text-slate-400'} text-xs md:text-sm font-medium`}>
                                {isLevelCritical ? '즉각적인 펌프 가동 검토가 필요합니다' : '실시간 재산출 기반 용수 수요 예측 현황'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50/30">

                    {/* 수위 경고 배너 (위험 시에만 노출) */}
                    {isLevelCritical && (
                        <div className="mb-8 flex items-center gap-4 bg-red-50 border-2 border-red-100 p-6 rounded-3xl animate-pulse">
                            <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200">
                                <AlertTriangle className="text-white w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-red-900 font-bold text-lg leading-tight">저수위 경보 발생</h4>
                                <p className="text-red-600 text-sm font-medium">현재 수위가 설정된 최저치({reservoir.minLevel}m)보다 낮습니다. 공급 부족이 예상됩니다.</p>
                            </div>
                            <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
                                즉시 조치
                            </button>
                        </div>
                    )}

                    {/* 상단 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <div className={`bg-white p-6 rounded-3xl border shadow-sm transition-colors ${isLevelCritical ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100'}`}>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Waves size={14} className={isLevelCritical ? "text-red-500" : "text-blue-500"} /> 현재 수위 현황
                            </p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${isLevelCritical ? 'text-red-600' : 'text-slate-900'}`}>
                                        {reservoir.currentLevel?.toFixed(1)}
                                    </span>
                                    <span className="text-slate-400 font-bold text-lg">/ {reservoir.maxLevel}m</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isLevelCritical ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {isLevelCritical ? 'Critical' : 'Stable'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <BarChart3 size={14} className="text-indigo-500" /> 알고리즘 예측 신뢰도
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-4xl font-black text-slate-900">{reservoir.accuracy}%</span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${reservoir.accuracy}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메인 차트 영역 */}
                    <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm mb-10">
                         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-500" /> 단계별 용수수요 예측 추이
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-300 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">기본 패턴</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-400 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">예측</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">실시간 데이터</span></div>
                            </div>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={10} interval={3} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dx={-5} />
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                    <Line type="monotone" dataKey="base" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="daily" stroke="#60a5fa" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="recal" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 하단 페이지 이동 가이드 */}
                    <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-3xl p-6 md:p-8 text-white">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-blue-400">
                                <Zap size={20} className="fill-blue-400" /> AI 펌프 운영 최적화
                            </h4>
                            <p className="text-slate-400 text-sm">에너지 비용을 최소화하는 정수장 가동 스케줄링을 확인하세요.</p>
                        </div>
                        <button
                            onClick={() => router.push(`/scheduling/${reservoir.id}`)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            스케줄링 리포트 <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}