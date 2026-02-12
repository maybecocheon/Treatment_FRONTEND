'use client'

import { Moon, AlertTriangle, Activity, Plus, ChevronDown, Database, Settings2 } from "lucide-react";

export default function GuidePanels() {
    return (
        <div className="h-full xl:col-span-1 flex flex-col items-center gap-2">
            {/* 1. 하루 정수 계획 */}
            <div className="w-full glass rounded-3xl p-4 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 opacity-[0.03] rotate-12 group-hover:opacity-[0.06] transition-opacity">
                    <Database size={80} className="text-blue-900" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 glass bg-slate-800 rounded-lg text-yellow-400 shadow-lg">
                        <Moon size={16} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-blue-950 tracking-tight">하루 정수 계획</h4>
                        <p className="text-[8px] font-bold text-blue-900/30 uppercase">Core Logic</p>
                    </div>
                </div>
                <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-bold text-blue-900/40 uppercase">목표 수위</span>
                    <span className="text-2xl font-black text-blue-600 leading-none">100%</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/50 flex gap-3 backdrop-blur-md">
                    <div className="w-1 bg-emerald-400 rounded-full"/>
                    <div className="flex flex-col">
                        <p className="text-[12px] font-bold text-emerald-950">
                            <span className="text-blue-600 font-black">23:00 ~ 09:00</span> 집중 가동
                        </p>
                        <p className="text-[10px] font-medium text-emerald-900/60 leading-tight">
                            야간 경부하 요금 활용 에너지 최적화
                        </p>
                    </div>
                </div>
            </div>

            {/* 연산 기호: PLUS */}
            <div className="z-10 -my-2 bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                <Plus size={14} className="text-slate-400" />
            </div>

            {/* 2. 특수 정수 운영 계획 */}
            <div className="w-full glass rounded-3xl p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 glass bg-amber-50 rounded-lg text-amber-600">
                        <Settings2 size={16} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-blue-950">특수 정수 운영 계획</h4>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Condition A</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 font-bold">중지</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-700 leading-tight">
                            새벽 시간대 <span className="text-blue-600 text-[11px]">모든 배수지</span> 최고 수위 시
                        </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-rose-400 uppercase">Condition B</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500 text-white font-bold">긴급</span>
                        </div>
                        <p className="text-[10px] font-bold text-rose-950 leading-tight">
                            <span className="text-rose-600 text-[11px]">최저 수위</span> 발생 시 고단가 즉시 펌핑
                        </p>
                        <AlertTriangle size={30} className="absolute -right-2 -bottom-2 text-rose-500/5 rotate-12" />
                    </div>
                </div>
            </div>

            {/* 연산 기호: EQUAL/ARROW */}
             <div className="z-10 -my-1">
                 <ChevronDown size={20} className="text-blue-400 animate-bounce" />
            </div>

            {/* 3. 지능형 시뮬레이션 제어 */}
            <div className="w-full backdrop-blur-md rounded-3xl p-4 bg-blue-100 border-2 border-blue-500/20 relative shadow-blue-500/5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 glass bg-blue-100/60 rounded-lg text-blue-600">
                        <Activity size={16} className="animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-blue-950">지능형 시뮬레이션</h4>
                    </div>
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <div className="p-3 rounded-xl glass">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                            <p className="text-[12px] font-bold text-slate-800">1분 단위 분배 최적화</p>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-tight">
                            배수지별 수위 연동 분배 비율 자동 조정
                        </p>
                    </div>

                    <div className="p-3 rounded-xl glass">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <p className="text-[12px] font-bold text-slate-800">계절별 가변 대수 제어</p>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-tight">
                            부하 시간대별 최적 펌프 가동 대수 결정
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}