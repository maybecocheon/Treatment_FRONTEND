'use client'

import WaterLevelPanel from "./WaterLevelPanel";
import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { Suspense } from "react";
import PageFallback from "@/components/skeletons/PageFallback";
import WaterLevelPanelSkeleton from "../skeletons/WaterLevelPanelSkeleton";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";

export default function Dashboard() {
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const isDanger = selectedReservoir && (selectedReservoir.level > selectedReservoir.maxLevel * 0.9 || selectedReservoir.level < selectedReservoir.maxLevel * 0.4);

    return (
        <>
            {/* SECTION 1: 위험 상태 */}
            <div className="grid grid-cols-12 mb-4">
                <div className="col-span-12 p-3 bg-white/60 border border-red-100 rounded-2xl shadow-sm">
                    <h3 className="text-md font-black text-red-600 px-1 mb-2">
                        위험 관제 시스템
                    </h3>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <RiskDetailPanel />
                        </div>
                        <div className="flex-1">
                            <RiskEventPanel />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: 전체 배수지 현황 */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 mb-4">

                <div className="col-span-5">
                    <Suspense fallback={<PageFallback skeleton={<WaterLevelPanelSkeleton />} />}>
                        <WaterLevelPanel />
                    </Suspense>
                </div>

                {/* SECTION 3: 선택 배수지 상세 분석 */}
                {selectedReservoir ? (
                    <div className={`${isDanger ? "bg-rose-50/90 border-rose-200/60" : "bg-emerald-50/90 border-slate-200/50"} 
                                    lg:col-span-7 flex flex-col gap-3 p-4 rounded-2xl transition-all duration-500 border shadow-xl`}>
                        <div className="flex flex-col md:flex-row items-center gap-2 px-1">
                            <div className={`w-2 h-2 rounded-full ${isDanger ? "bg-rose-500 animate-ping" : "bg-emerald-500"}`} />

                            <h2 className={`text-md font-black ${isDanger ? "text-rose-950" : "text-slate-700"}`}>
                                {selectedReservoir.reservoirName} 상세 분석 및 최적화
                            </h2>
                            <span className={`text-xs font-normal ml-2 ${isDanger ? "text-rose-600/60" : "text-slate-500"}`}>
                                * 좌측에서 배수지를 선택하면 해당 데이터로 업데이트됩니다.
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                            <PredictionPanel />
                            <PumpSchedulePanel />
                        </div>
                    </div>
                ) : (
                    <div className="glass lg:col-span-7 flex items-center justify-center p-4 rounded-2xl text-slate-400 font-bold border-dashed border-2 border-slate-200">
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-slate-50 rounded-full">🔍</div>
                            배수지를 선택해 주세요.
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}
