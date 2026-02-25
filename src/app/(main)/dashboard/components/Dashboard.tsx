'use client'

import WaterLevelPanel from "./WaterLevelPanel";
import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { AlertTriangle, Droplets, Newspaper } from "lucide-react";
import GuidePanels from "./GuidePanels";
import EnergySave from "@/components/main/EnergySave";
import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { useTreatment } from "@/hooks/useTreatment";
import { useMemo } from "react";
import { useAllPrediction } from "@/hooks/useAllPrediction";
import EmptySelection from "@/components/main/EmptySelection";

export default function Dashboard() {
    const { reservoirLevels, loadLevels, error, isLoading } = useReservoirLevel();
    const { treatment, loadTreatment } = useTreatment();
    const { checkLevelRisk } = useAllPrediction();

    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    // 위험한 배수지만 따로 필터링 
    const dangerReservoirs = useMemo(() => {
        return reservoirLevels.filter(res => res.riskStatus !== "normal");
    }, [reservoirLevels]);

    // 위험 점수 계산
    const riskMetrics = useMemo(() => {
        if (reservoirLevels.length === 0) {
            return { totalScore: 0, dangerCount: 0, treatmentFine: true };
        }

        const dangerCount = dangerReservoirs.length;
        const reservoirPenalty = dangerCount * 6;

        // 정수장 상태 체크
        const isTreatmentAbnormal = treatment && (treatment.pressOutAvg < 9 || treatment.pressOutAvg > 10);
        const treatmentPenalty = isTreatmentAbnormal ? 28 : 0;
        const treatmentFine = !isTreatmentAbnormal;

        // 최종 점수
        const totalScore = Math.max(0, 100 - reservoirPenalty - treatmentPenalty);

        return {
            totalScore,
            dangerCount,
            treatmentFine
        };
    }, [reservoirLevels, treatment, checkLevelRisk]);

    return (
        <div className="h-full flex flex-col xl:grid xl:grid-cols-12 gap-4">

            {/* [LEFT SECTION]: 위험 감지 */}
            <div className="h-full xl:col-span-2 flex flex-col gap-4 p-5 bg-white/60 border border-red-100 rounded-2xl shadow-lg">
                <h3 className="text-md font-black text-red-600 px-1 flex items-center gap-2">
                    <AlertTriangle size={20} /> 위험 관제 시스템
                </h3>
                <div className="flex-1 flex flex-col gap-4">
                    <RiskDetailPanel riskMetrics={riskMetrics} />
                    <div className="flex-1 border-t border-red-50 pt-4">
                        <RiskEventPanel dangerReservoirs={dangerReservoirs} />
                    </div>
                </div>
            </div>

            {/* [CENTER SECTION]: 수위 or 유입량 현황 */}
            <div className="h-auto flex-1 xl:col-span-7 flex flex-col gap-4">
                <div className="flex-[1.2]">
                    <WaterLevelPanel reservoirLevels={reservoirLevels} isLoading={isLoading} error={error} loadLevels={loadLevels}
                        treatment={treatment} loadTreatment={loadTreatment} />
                </div>
                {/* [CENTER SECTION] 내 상세 분석 영역 */}
                <div className={`flex-[0.8] p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-all duration-500
                    ${!selectedReservoir
                        ? "bg-slate-50/50 border border-dashed border-slate-300"
                        : selectedReservoir.riskStatus === "normal" ? "bg-emerald-50/90" : "bg-rose-50/90 border-rose-200"}`}>

                    {selectedReservoir ? (
                        // 1. 배수지가 선택되었을 때
                        <>
                            <div className="flex justify-between items-center">
                                <h2 className="text-md font-black text-slate-600 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${selectedReservoir.riskStatus === "normal" ? "bg-emerald-500" : "bg-rose-500" } animate-ping`} />
                                    {selectedReservoir.reservoirName} 상세 분석
                                </h2>
                                <span className={`text-xs font-normal ml-2 ${selectedReservoir.riskStatus === "normal" ? "text-slate-500" : "text-rose-600/60" }`}>
                                    * 분 단위 실시간 데이터입니다.
                                </span>
                            </div>
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <PredictionPanel />
                                <PumpSchedulePanel />
                            </div>
                        </>
                    ) : (
                        // 2. 배수지가 선택되지 않았을 때
                        <EmptySelection />
                    )}
                </div>
            </div>

            {/* [RIGHT SECTION]: 리포트 및 가이드 */}
            <div className="h-full xl:col-span-3 flex flex-col gap-3 bg-white/60 border border-emerald-400 rounded-2xl shadow-lg p-5">
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
            <hr className="block xl:hidden border-sky-50" />
        </div>
    );
}