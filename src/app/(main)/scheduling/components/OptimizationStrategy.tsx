'use client'

import EnergySave from "@/components/main/EnergySave";
import { Zap, Ruler, Clock, TrendingDown, ShieldAlert, ArrowRight } from "lucide-react";
import PumpOptimization from "./PumpOptimization";

export default function OptimizationStrategy() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* [Section 1] 최종 핵심 성과 */}
            <div className="w-full">
                <div className="glass rounded-3xl p-6 transition-all border border-emerald-100 shadow-xl shadow-emerald-900/5 bg-linear-to-b from-white to-emerald-50/30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* 왼쪽 섹션: 핵심 텍스트 성과 */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="flex gap-4 items-center">
                                <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200 shrink-0">
                                    <TrendingDown size={28} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-0.5">
                                        지능형 펌프 운영 최종 성과
                                    </h2>
                                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                        AI 최적화 알고리즘 적용 시 전력 요금 절감 리포트
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">

                                <div className="inline-flex items-center gap-4 bg-white px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">평균 절감률</span>
                                    <div className="h-4 w-px bg-slate-200" />
                                    <div className="flex items-baseline gap-0.5 text-emerald-600">
                                        <span className="text-3xl font-black">5~10</span>
                                        <span className="text-sm font-bold">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽 섹션: 에너지 절감 상세 비교 차트 */}
                        <div className="lg:col-span-7 bg-white/50 rounded-2xl p-2">
                            <EnergySave />
                        </div>

                    </div>
                </div>
            </div>

            {/* [Section 2] 성과 달성 수단 */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                <div className="md:col-span-4 flex flex-col justify-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800">어떻게 비용을 절감하나요?</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        단순 가동이 아닌, 실시간 부하를 분석하여 <span className="text-blue-600 font-bold">최적의 펌프 조합</span>을 찾아냅니다.
                        비싼 시간대의 가동을 피하고 경부하 시간대에 에너지를 비축하는 것이 핵심입니다.
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-tighter mt-2">
                        <span>실시간 펌프 스케줄링 적용 중</span>
                        <ArrowRight size={14} />
                    </div>
                </div>

                <div className="md:col-span-8">
                    <PumpOptimization />
                </div>
            </div>

            {/* [Section 3] 상세 로직 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1: 분석 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-blue-300 shadow-xs flex flex-col h-full">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Ruler size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Logic 01</span>
                            <h4 className="text-base font-black text-slate-800 tracking-tight">배수지 단면적 산출</h4>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[13px] mt-2 font-medium">
                        유출입량 분 데이터를 역산하여 <span className="text-slate-900 font-bold">배수지 단면적</span>을 도출하고 정확한 필요 유입량을 계산합니다.
                    </p>
                </div>

                {/* Step 2: 최적화 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-blue-300 shadow-xs flex flex-col h-full">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Clock size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Logic 02</span>
                            <h4 className="text-base font-black text-slate-800 tracking-tight">전력 부하별 전략</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                        <div className="flex flex-col gap-2 mt-3">
                            <div className="bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                                <p className="text-[11px] font-bold text-emerald-700">경부하 (야간): <span className="text-emerald-900">5시간 집중 가동 및 만수위 도달 전 손실 최소화 가동</span></p>
                            </div>
                            <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                                <p className="text-[11px] font-bold text-amber-700">최대부하 (낮): <span className="text-amber-900">최저 수위 대응</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: 안전장치 */}
                <div className="group bg-slate-900 rounded-2xl p-6 shadow-xl flex flex-col h-full">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <ShieldAlert size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Safety Lock</span>
                            <h4 className="text-base font-black text-white tracking-tight mt-0.5">동작 안정성 가이드</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                        <ul className="mt-3 space-y-2">
                            <li className="flex items-start gap-2 text-[12px] text-slate-400 font-medium">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                                <span>최소 가동 <strong className="text-blue-400">1시간</strong> 준수 (펌프 보호)</span>
                            </li>
                            <li className="flex items-start gap-2 text-[12px] text-slate-400 font-medium">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                                <span>최저 수위 도달 시 즉시 가동 (비상 대응)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}