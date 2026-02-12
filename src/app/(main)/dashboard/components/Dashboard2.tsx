'use client'

import WaterLevelPanel from "./WaterLevelPanel";
import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { AlertTriangle, DollarSign, Activity, TrendingUp, Database, Moon, Plus, Settings2, ChevronDown, Equal } from "lucide-react";
import GuidePanels from "../../scheduling/components/GuidePanels";

export default function Dashboard2() {
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const isDanger = selectedReservoir && (selectedReservoir.level > selectedReservoir.maxLevel * 0.9 || selectedReservoir.level < selectedReservoir.maxLevel * 0.4);

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-4 p-4 h-full">

            {/* [LEFT SECTION]: 위험 감지 및 관제 (3/12) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex-1 p-5 bg-white/60 border border-red-100 rounded-2xl shadow-sm overflow-y-auto no-scrollbar">
                    <h3 className="text-md font-black text-red-600 px-1 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} /> 위험 관제 시스템
                    </h3>
                    <div className="flex flex-col gap-4">
                        <RiskDetailPanel />
                        <div className="border-t border-red-50 pt-4">
                            <RiskEventPanel />
                        </div>
                    </div>
                </div>
            </div>

            {/* [CENTER SECTION]: 수위 현황 및 상세 차트 (6/12) */}
            <div className="xl:col-span-7 flex flex-col gap-4">
                {/* 전체 수위 현황 */}
                <div className="flex-1">
                    <WaterLevelPanel />
                </div>

                {/* 선택 배수지 상세 분석 차트 영역 */}
                <div className={`flex-1 p-6 rounded-2xl border shadow-xl flex flex-col gap-4 transition-colors duration-500
                    ${isDanger ? "bg-rose-50/90 border-rose-200" : "bg-emerald-50/90 border-slate-200"}`}>

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <Activity size={20} className="text-blue-500" />
                            {selectedReservoir?.reservoirName || "배수지"} 상세 분석
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                        <PredictionPanel />
                        <PumpSchedulePanel />
                    </div>
                </div>
            </div>

            {/* [RIGHT SECTION]: 가이드패널 및 에너지 최적화 (3/12) */}
            <div className="xl:col-span-3 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                {/* 에너지 비용 최적화 리포트 */}
                <div className="glass flex flex-col rounded-2xl p-4 shadow-lg gap-4 border border-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 glass bg-white/60 rounded-xl text-amber-600">
                            <DollarSign size={18} />
                        </div>
                        <div>
                            <h4 className="text-base font-black text-blue-950 tracking-tight">비용 최적화 리포트</h4>
                            <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">Cost Forecast</p>
                        </div>
                    </div>

                    <div className="bg-emerald-500 text-white rounded-2xl p-4 shadow-md shadow-emerald-100">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold opacity-80 uppercase">예상 절감액</span>
                            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">18.5% SAVING</span>
                        </div>
                        <p className="text-2xl font-black mt-1">- ₩1,420,000</p>
                    </div>

                    <div className="flex flex-col gap-3 py-2">
                        {/* 기존 비용 바 */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-end px-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">기존</span>
                                <span className="text-[10px] font-bold text-slate-400">₩13.9M</span>
                            </div>
                            <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="absolute left-0 top-0 h-full w-full bg-slate-200 rounded-full" />
                            </div>
                        </div>

                        {/* AI 최적 비용 바 */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-end px-1">
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tight">AI 최적</span>
                                <span className="text-[10px] font-black text-emerald-600">₩12.4M</span>
                            </div>
                            <div className="relative w-full h-3 bg-emerald-50 rounded-full overflow-hidden">
                                {/* 12.4 / 13.9 = 약 89% */}
                                <div className="absolute left-0 top-0 h-full w-[89%] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 지능형 운영 가이드 패널 */}
                <div className="h-full flex flex-col gap-4 glass p-2 rounded-2xl">
                    {/* 상단 섹션: 1 + 2 가로 배치 */}
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full">

                        {/* 1. 하루 정수 계획 */}
                        <div className="flex-1 w-full glass rounded-[2rem] p-4 relative overflow-hidden group border border-white/50 shadow-sm min-h-[180px]">
                            <div className="absolute -top-6 -right-6 opacity-[0.05] rotate-12 group-hover:opacity-[0.08] transition-opacity">
                                <Database size={80} className="text-blue-900" />
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 glass bg-slate-800 rounded-xl text-yellow-400">
                                    <Moon size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-blue-950 tracking-tight">하루 정수 계획</h4>
                                </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex gap-3 backdrop-blur-md">
                                <div className="w-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                <div className="flex flex-col">
                                    <p className="text-[12px] font-bold text-emerald-950 mb-0.5">
                                        <span className="text-blue-600 font-black">23:00~09:00</span> 집중
                                    </p>
                                    <p className="text-[10px] font-medium text-emerald-800/70 leading-tight">
                                        야간 경부하 요금 활용<br />에너지 최적화 가동
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 연산 기호: PLUS */}
                        <div className="shrink-0 z-10 bg-white rounded-full p-2 border border-slate-200 shadow-md text-slate-400">
                            <Plus size={18} strokeWidth={3} />
                        </div>

                        {/* 2. 특수 정수 운영 계획 */}
                        <div className="flex-1 w-full glass rounded-[2rem] p-4 border border-white/50 shadow-sm min-h-[180px]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 glass bg-amber-50 rounded-xl text-amber-600">
                                    <Settings2 size={18} />
                                </div>
                                <h4 className="text-sm font-black text-blue-950">특수 운영 계획</h4>
                            </div>

                            <div className="space-y-2">
                                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 flex justify-between items-center">
                                    <p className="text-[11px] font-bold text-slate-700">새벽 최고 수위 시</p>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-black uppercase tracking-tighter">중지</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex justify-between items-center">
                                    <p className="text-[11px] font-bold text-rose-950">최저 수위 발생 시</p>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500 text-white font-black uppercase tracking-tighter">긴급</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 연산 기호: EQUAL (=) */}
                    <div className="flex justify-center -my-2">
                        <div className="bg-blue-500 rounded-full p-1.5 text-white shadow-lg shadow-blue-200">
                            <Equal size={20} strokeWidth={4} />
                        </div>
                    </div>

                    {/* 3. 지능형 시뮬레이션 제어 (결과 섹션) */}
                    <div className="w-full backdrop-blur-xl rounded-[2rem] p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 relative shadow-xl shadow-blue-900/5">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 glass bg-blue-600 rounded-2xl text-white shadow-blue-200 shadow-lg">
                                <Activity size={20} className="animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-base font-black text-blue-950 tracking-tight uppercase">지능형 시뮬레이션 결과</h4>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 border border-blue-100 shadow-sm">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                <div>
                                    <p className="text-[14px] font-black text-slate-800 mb-1.5">1분 단위 분배 최적화</p>
                                    <p className="text-[11px] text-slate-500 leading-normal font-medium">배수지별 수위 연동 실시간<br />공급 비율 정밀 자동 제어</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 border border-emerald-100 shadow-sm">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                <div>
                                    <p className="text-[14px] font-black text-slate-800 mb-1.5">계절별 가변 대수 제어</p>
                                    <p className="text-[11px] text-slate-500 leading-normal font-medium">전력 부하 시뮬레이션 기반<br />최적 펌프 가동 대수 결정</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}