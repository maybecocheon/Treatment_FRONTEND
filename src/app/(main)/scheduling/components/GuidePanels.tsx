'use client'

import { Activity, Plus, ChevronDown } from "lucide-react";

export default function GuidePanels() {
    return (
        <div className="flex-1 flex flex-col gap-3 glass p-3 rounded-2xl">
            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-2 w-full">
                {/* 1. 하루 정수 계획 */}
                <div className="w-full flex flex-col gap-2">
                    <h4 className="text-[13px] font-black text-blue-950 text-center uppercase opacity-70">하루 정수 계획</h4>
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex gap-2 items-center">
                        <div className="w-0.5 h-8 bg-emerald-400 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <p className="text-[12px] font-bold text-emerald-950 leading-none">
                                <span className="text-blue-600 font-black">23:00~09:00</span> 집중 가동
                            </p>
                            <p className="text-[11px] font-medium text-emerald-800/70">야간 경부하 요금 활용 에너지 최적화 가동</p>
                        </div>
                    </div>
                </div>

                {/* 플러스 기호 */}
                <div className="shrink-0 bg-white rounded-full p-1 border border-slate-200 text-slate-400 sm:rotate-0 rotate-90">
                    <Plus size={12} strokeWidth={3} />
                </div>

                {/* 2. 특수 운영 계획 */}
                <div className="w-full flex flex-col gap-2">
                    <h4 className="text-[13px] font-black text-blue-950 text-center uppercase opacity-70">특수 운영 계획</h4>
                    <div className="flex gap-2">
                        <div className="flex-1 p-1.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-slate-500">새벽 최고 수위 시</p>
                            <p className="text-[11px] font-black text-slate-700">중지</p>
                        </div>
                        <div className="flex-1 p-1.5 rounded-lg bg-rose-50 border border-rose-100 flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-rose-400">최저 수위 발생 시</p>
                            <p className="text-[11px] font-black text-rose-600">긴급</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 화살표 아이콘 */}
            <div className="flex justify-center -my-1">
                <ChevronDown size={16} className="text-blue-300 animate-bounce" />
            </div>

            {/* 결과 섹션 */}
            <div className="flex-1 flex flex-col w-full rounded-2xl p-3 gap-2 bg-white border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                        <Activity size={14} className="animate-pulse" />
                    </div>
                    <h4 className="text-[14px] font-black text-blue-950 uppercase">지능형 운영 스케줄링</h4>
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50/50">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                <p className="text-[13px] font-bold text-slate-700 leading-tight">1분 단위 분배 최적화</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal font-medium">배수지별 수위 연동 실시간 공급 비율 정밀 자동 제어</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-emerald-50/50">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <p className="text-[13px] font-bold text-slate-700 leading-tight">계절별 가변 대수 제어</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal font-medium">전력 부하 시뮬레이션 기반 최적 펌프 가동 대수 결정</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}