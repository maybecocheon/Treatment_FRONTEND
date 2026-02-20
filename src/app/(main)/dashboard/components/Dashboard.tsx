'use client'

import WaterLevelPanel from "./WaterLevelPanel";
import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { AlertTriangle, Newspaper } from "lucide-react";
import GuidePanels from "./GuidePanels";
import EnergySave from "@/components/main/EnergySave";

export default function Dashboard() {
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const isDanger = selectedReservoir && (selectedReservoir.level > selectedReservoir.maxLevel * 0.9 || selectedReservoir.level < selectedReservoir.maxLevel * 0.4);

    return (
        <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4">

            {/* [LEFT SECTION]: 위험 감지 */}
            <div className="lg:col-span-2 flex flex-col gap-4 p-5 bg-white/60 border border-red-100 rounded-2xl shadow-lg">
                <h3 className="text-md font-black text-red-600 px-1 flex items-center gap-2">
                    <AlertTriangle size={20} /> 위험 관제 시스템
                </h3>
                <div className="flex-1 flex flex-col gap-4">
                    <RiskDetailPanel />
                    <div className="flex-1 border-t border-red-50 pt-4">
                        <RiskEventPanel />
                    </div>
                </div>
            </div>

            {/* [CENTER SECTION]: 수위 or 유입량 현황 */}
            <div className="h-auto flex-1 lg:col-span-7 flex flex-col gap-4">
                <div className="flex-1">
                    <WaterLevelPanel />
                </div>
                <div className={`flex-1 p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-colors duration-500
                    ${isDanger ? "bg-rose-50/90 border-rose-200" : "bg-emerald-50/90"}`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-black text-slate-600 flex items-center gap-2">
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
            <div className="h-full lg:col-span-3 flex flex-col gap-3 bg-white/60 border border-emerald-400 rounded-2xl shadow-lg p-5">
                <h3 className="text-md font-black text-slate-600 px-1 flex items-center gap-2">
                    <Newspaper size={20} /> 최적화 리포트
                </h3>
                {/* 비용 리포트 */}
                <div className="flex flex-col rounded-2xl p-4 gap-3 bg-white backdrop-blur-sm border border-slate-200/50">
                    <h4 className="text-[13px] font-black text-blue-950 text-center uppercase opacity-70">최적화 시 비용</h4>
                    <EnergySave />
                </div>

                {/* 지능형 운영 가이드 */}
                <GuidePanels />
            </div>
            <hr className="block lg:hidden border-sky-50" />
        </div>
    );
}