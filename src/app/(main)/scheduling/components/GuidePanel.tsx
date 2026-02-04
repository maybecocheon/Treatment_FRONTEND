'use client';

import { ModalProps } from "@/app/props/ModalProps";
import { Cpu, DollarSign, Moon, Sun, CheckCircle2, AlertTriangle, Activity } from "lucide-react";

export default function GuidePannel({ params }: ModalProps) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            {/* 1. 심야 정수 계획 패널 */}
            <div className="xl:col-span-3 glass rounded-[2.5rem] p-6 relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 rotate-12">
                    <Cpu size={120} className="text-blue-900" />
                </div>
                <div className="flex items-center gap-3 mb-4 relative">
                    <div className="p-2 glass bg-slate-700 rounded-xl text-yellow-400">
                        <Moon size={18} />
                    </div>
                    <div>
                        <h4 className="text-base font-black text-blue-950 tracking-tight">심야 정수 계획</h4>
                        <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">AI Analysis</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3 mb-4">
                    <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-blue-900/40 uppercase">목표 수위</span>
                        <span className="text-3xl font-black text-blue-600">82%</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-blue-900/40 uppercase">수요량</span>
                        <span className="text-lg font-bold text-blue-950">+12,400 m³</span>
                    </div>
                </div>
                <div className="relative space-y-3">
                    <div className="p-4 rounded-3xl bg-emerald-50/40 border border-emerald-100/50 flex gap-4 backdrop-blur-md">
                        <div className="w-1 bg-emerald-400 rounded-full"></div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-emerald-950">
                                <span className="text-blue-600 font-black">02:00 ~ 05:00</span> 집중 가동 권장
                            </p>
                            <p className="text-[11px] font-medium text-emerald-900/60 leading-tight">
                                야간 경부하 요금을 활용해 에너지를 최적화하세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. 주간 가동 및 결과 예측 패널 (E-4 통합) */}
            <div className="xl:col-span-3 glass rounded-[2.5rem] p-6 relative overflow-hidden group flex flex-col gap-5">
                {/* 주간 가동 섹션 */}
                <div className="flex items-center gap-3 mb-4 relative">
                    <div className="p-2 glass bg-amber-100/60 rounded-xl text-amber-700">
                        <Sun size={18} />
                    </div>
                    <div>
                        <h4 className="text-base font-black text-blue-950 tracking-tight">주간 보조 가동</h4>
                    </div>
                </div>
                <div className="space-y-2">
                    {[
                        { time: "07-08시", label: "아침 피크 대응", status: "60% 가동", color: "blue" },
                        { time: "12-14시", label: "런칭 구간 유지", status: "가동 중지", color: "slate" },
                        { time: "18-21시", label: "저녁 피크 대응", status: "50% 가동", color: "blue" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                            <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* E-4. 배수지 수위·관압 충족 결과 미리보기 */}
            <div className="xl:col-span-3 glass rounded-[2.5rem] p-6 relative overflow-hidden group flex flex-col gap-5">
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

            {/* 3. 통합 비용 분석 패널 */}
            <div className="xl:col-span-3 glass rounded-[2.5rem] p-6 relative overflow-hidden group flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 relative">
                    <div className="p-2 glass bg-white/60 rounded-xl text-amber-600">
                        <DollarSign size={18} />
                    </div>
                    <div>
                        <h4 className="text-base font-black text-blue-950 tracking-tight">에너지 비용 최적화 리포트</h4>
                        <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">Cost Forecast</p>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-4 px-2 mb-4">
                    <div className="space-y-1">
                        <div className="flex justify-between items-end px-1">
                            <span className="text-[10px] font-bold text-blue-900/40">현재 비용</span>
                            <span className="text-xs font-bold text-blue-950">₩13.9M</span>
                        </div>
                        <div className="h-2 w-full bg-blue-900/5 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-blue-900/20" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-end px-1">
                            <span className="text-[10px] font-bold text-emerald-600">최적화 후 비용 (AI)</span>
                            <span className="text-sm font-black text-emerald-600">₩12.48M</span>
                        </div>
                        <div className="h-3 w-full bg-emerald-900/5 rounded-full overflow-hidden border border-emerald-100/30">
                            <div className="h-full w-[81%] bg-linear-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 md:gap-1 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 min-w-40">
                    <div>
                        <p className="text-[9px] font-black text-emerald-950/40 uppercase">예상 절감액</p>
                        <p className="text-xl font-black text-emerald-600 tracking-tighter">- ₩1.42M</p>
                    </div>
                    <div className="text-right text-sm">
                        <p className="text-[9px] font-black text-emerald-600 uppercase">Saving Rate</p>
                        <p className="text-xl font-black text-emerald-600 tracking-tighter">18.5%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}