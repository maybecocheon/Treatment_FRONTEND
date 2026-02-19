'use client'

import WaterLevelPanel from "./WaterLevelPanel";
import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { AlertTriangle, DollarSign } from "lucide-react";
import GuidePanels from "../../scheduling/components/GuidePanels";

export default function Dashboard2() {
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const isDanger = selectedReservoir && (selectedReservoir.level > selectedReservoir.maxLevel * 0.9 || selectedReservoir.level < selectedReservoir.maxLevel * 0.4);

    return (
        <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4">

            {/* [LEFT SECTION]: 위험 감지 */}
            <div className="lg:col-span-2 flex flex-col gap-4 p-5 bg-white/60 border border-red-100 rounded-2xl shadow-lg">
                <h3 className="text-md font-black text-red-600 px-1 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} /> 위험 관제 시스템
                </h3>
                <div className="flex-1 flex flex-col gap-4">
                    <RiskDetailPanel />
                    <div className="flex-1 border-t border-red-50 pt-4">
                        <RiskEventPanel />
                    </div>
                </div>
            </div>

            {/* [CENTER SECTION]: 수위 현황 */}
            <div className="h-auto flex-1 lg:col-span-7 flex flex-col gap-4">
                <div className="flex-1">
                    <WaterLevelPanel />
                </div>
                <div className={`flex-1 p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-colors duration-500
                    ${isDanger ? "bg-rose-50/90 border-rose-200" : "bg-emerald-50/90"}`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isDanger ? "bg-rose-500" : "bg-emerald-500"} animate-ping`} />
                            {selectedReservoir?.reservoirName || "배수지"} 상세 분석
                        </h2>
                        <span className={`text-xs font-normal ml-2 ${isDanger ? "text-rose-600/60" : "text-slate-500"}`}>
                            * 상단에서 배수지를 선택하세요.
                        </span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <PredictionPanel />
                        <PumpSchedulePanel />
                    </div>
                </div>
            </div>

            {/* [RIGHT SECTION]: 리포트 및 가이드 */}
            <div className="h-full lg:col-span-3 flex flex-col gap-3">
                {/* 비용 리포트 */}
                <div className="glass flex flex-col rounded-2xl p-3 gap-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 glass bg-white/60 rounded-lg text-amber-600">
                            <DollarSign size={16} />
                        </div>
                        <h4 className="text-sm font-black text-blue-950 tracking-tight">비용 최적화 리포트</h4>
                    </div>

                    <div className="bg-emerald-500 text-white rounded-xl p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[9px] font-bold opacity-80 uppercase">예상 절감액</span>
                            <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full">18.5% SAVING</span>
                        </div>
                        <p className="text-xl font-black">- ₩1,420,000</p>
                    </div>

                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-end px-1 text-[9px] font-bold">
                                <span className="text-slate-400 uppercase">기존</span>
                                <span className="text-slate-400">₩13.9M</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-slate-200" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-end px-1 text-[9px] font-bold">
                                <span className="text-emerald-600 uppercase">AI 최적</span>
                                <span className="text-emerald-600">₩12.4M</span>
                            </div>
                            <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden">
                                <div className="h-full w-[89%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 지능형 운영 가이드 */}
                <GuidePanels />
            </div>
            <hr className="block lg:hidden border-sky-50" />
        </div>
    );
}