'use client'

import PredictionPanel from "./PredictionPanel";
import RiskEventPanel from "./RiskEventPanel";
import PumpSchedulePanel from "./PumpSchedulePanel";
import RiskDetailPanel from "./RiskDetailPanel";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { AlertTriangle, Newspaper, Play, Zap } from "lucide-react";
import GuidePanels from "./GuidePanels";
import EnergySave from "@/components/main/EnergySave";
import { useReservoirLevel } from "@/hooks/useReservoirLevel";
import { useTreatment } from "@/hooks/useTreatment";
import { useMemo, useState } from "react";
import { useAllPrediction } from "@/hooks/useAllPrediction";
import EmptySelection from "@/components/main/EmptySelection";
import RiskPanelSkeleton from "../skeletons/RiskPanelSkeleton";
import UnifiedWaterLevelPanel from "@/components/main/UnifiedWaterLevelPanel";
import FetchingSpinner from "@/components/main/FetchingSpinner";
import ErrorFallback from "@/components/fallback/ErrorFallback";
import PageFallback from "@/components/fallback/PageFallback";

export default function Dashboard() {
    // 시뮬레이션 토글
    const [isStatus, setIsStatus] = useState(false);

    // 데이터 패칭
    const { reservoirLevels, loadLevels, error, isLoading, isFetching } = useReservoirLevel();
    const { treatment, loadTreatment, error: treatmentError, isLoading: isTreatmentLoading, isFetching: isTreatmentFetching } = useTreatment();
    const { checkLevelRisk, isLoading: isPredictionLoading, error: predictionError, isFetching: isPredictionFetching, loadPredictionAll } = useAllPrediction();

    // 선택된 배수지 Atom
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
        <div className="flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-4">

            {/* [LEFT SECTION]: 위험 감지 */}
            <div className="h-full xl:col-span-2 flex flex-col">
                {isLoading || isPredictionLoading || isTreatmentLoading ? (
                    <PageFallback skeleton={<RiskPanelSkeleton />} />
                ) :
                    <div className="h-full flex flex-col gap-4 p-5 glass border border-danger/20 rounded-2xl relative">
                        {error || predictionError || treatmentError ? (
                            <ErrorFallback error={error || predictionError || treatmentError}
                                onClick={() => { loadLevels(); loadPredictionAll(); loadTreatment(); }} />
                        ) : (
                            <>
                                <FetchingSpinner isFetching={isFetching || isPredictionFetching || isTreatmentFetching} />
                                <h3 className="font-black text-danger px-1 flex items-center gap-2">
                                    <AlertTriangle size={20} /> 위험 관제 시스템
                                </h3>
                                <div className="flex-1 flex flex-col gap-4">
                                    <RiskDetailPanel riskMetrics={riskMetrics} />
                                    <div className="flex-1 border-t border-subtle-border pt-4">
                                        <RiskEventPanel dangerReservoirs={dangerReservoirs} isFetching={isPredictionFetching} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                }
            </div>

            {/* [CENTER SECTION]: 수위 or 유입량 현황 */}
            <div className="h-auto flex-1 xl:col-span-7 flex flex-col gap-2 relative">
                <button
                    onClick={() => setIsStatus(!isStatus)}
                    className={`absolute right-5 top-5 z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                        ${isStatus
                            ? "bg-warning-bg text-warning-text hover:bg-warning-bg/80 border border-warning/30" // 시뮬레이션 중: 앰버색
                            : "bg-info-bg text-info-text hover:bg-info-bg/80 border border-info/30" // 실시간 중: 스카이 블루색
                        }
                    `}
                >
                    {isStatus ? (
                        <>
                            <Play size={16} className="text-warning-text" />
                            시뮬레이션 모드
                        </>
                    ) : (
                        <>
                            <Zap size={16} className="text-info-text" />
                            실시간 모드
                        </>
                    )}
                </button>
                {isStatus ?
                    <div className="flex-1">
                        <UnifiedWaterLevelPanel mode="simulation" />
                    </div>
                    :
                    <>
                        <div className="flex-[1.2]">
                            <UnifiedWaterLevelPanel mode="dashboard" />
                        </div>
                        {/* [CENTER SECTION] 내 상세 분석 영역 */}
                        <div className={`flex-[0.8] p-4 md:p-6 rounded-2xl flex flex-col gap-4 transition-all duration-500
                        ${!selectedReservoir
                                ? "bg-card-border/10 border border-dashed border-muted/30"
                                : selectedReservoir.riskStatus === "normal"
                                    ? "bg-success-bg border border-success/30"
                                    : "bg-danger-bg border border-danger/30"}`}>

                            {selectedReservoir ? (
                                // 1. 배수지가 선택되었을 때
                                <>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-md font-black text-foreground opacity-80 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedReservoir.riskStatus === "normal" ? "bg-success" : "bg-danger"} animate-ping`} />
                                            {selectedReservoir.reservoirName} 상세 분석
                                        </h2>
                                        <span className={`text-xs font-normal ml-2 ${selectedReservoir.riskStatus === "normal" ? "text-muted" : "text-danger/60"}`}>
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
                    </>
                }</div>

            {/* [RIGHT SECTION]: 리포트 및 가이드 */}
            <div className="flex-1 xl:col-span-3 flex flex-col">
                <div className="h-full xl:col-span-3 flex flex-col gap-3 glass border-success/20 p-5 rounded-2xl relative">
                    <h3 className="font-black text-foreground opacity-80 px-1 flex items-center gap-2">
                        <Newspaper size={20} /> 최적화 리포트
                    </h3>
                    {/* 비용 리포트 */}
                    <div className="flex flex-col rounded-2xl p-4 gap-3 bg-card border border-card-border">
                        <h4 className="text-[13px] font-black text-foreground text-center uppercase">최적화 시 비용</h4>
                        <EnergySave />
                    </div>

                    {/* 지능형 운영 가이드 */}
                    <GuidePanels />
                </div>
            </div>
            <hr className="block xl:hidden border-subtle-border" />
        </div>
    );
}
