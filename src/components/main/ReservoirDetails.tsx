'use client'

import { detailViewModeAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import { usePredictionData } from "@/hooks/usePredictionData";
import useOptimization from "@/hooks/useOptimization";
import { useAtom, useAtomValue } from "jotai";
import ErrorFallback from "../fallback/ErrorFallback";
import ReservoirModalSkeleton from "./skeletons/ReservoirModalSkeleton";
import ReservoirDetailSkeleton from "./skeletons/ReservoirDetailsSkeleton";
import { AlertTriangle, BarChart3, TrendingUp, Waves, Sparkles } from "lucide-react";
import { WaterWave } from "../WaterWave";
import PredictionChart from "./PredictionChart";
import EnergySave from "./EnergySave";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";

interface ReservoirDetailsProps {
    isModalOpen?: boolean;
}

export default function ReservoirDetails({ isModalOpen: propIsModalOpen }: ReservoirDetailsProps) {
    const mapUI = useMapUI();
    const isModalOpen = propIsModalOpen ?? mapUI?.isModalOpen;
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    // viewMode 상태
    const [viewMode, setDetailViewMode] = useAtom(detailViewModeAtom);

    // 예측 데이터
    const { minuteData, loadPredictionData, filteredChartData,
        error: predictionError, selectedRange, setSelectedRange, isLoading: isPredictionLoading } = usePredictionData();

    // 최적화 데이터
    const { optimizationData, isLoading: isOptLoading, error: optError, loadOptimization } = useOptimization();

    // 공통 로딩 및 에러 처리
    const isLoading = isPredictionLoading || (viewMode === "optimization" && isOptLoading);
    const error = viewMode === "prediction" ? predictionError : optError;
    const handleReload = viewMode === "prediction" ? loadPredictionData : loadOptimization;

    const isLevelCritical = selectedReservoir?.riskStatus === "low" || selectedReservoir?.riskStatus === "high";
    const levelPercent = (minuteData?.currentLevel / minuteData?.maxLevel) * 100;

    return (
        <div className={`flex-1 p-6 overflow-y-auto overflow-x-hidden rounded-b-4xl transition-colors duration-500 
            ${isLevelCritical
                ? "bg-danger-bg"
                : "bg-info-bg"}`}>
            <div className="h-full flex flex-col gap-4">
                <div className="flex justify-center">
                    <div className="flex w-full p-1.5 bg-muted/10 backdrop-blur-md rounded-2xl border border-card-border shadow-inner">
                        {/* 예측 탭 */}
                        <button
                            onClick={() => setDetailViewMode("prediction")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                                ${viewMode === "prediction"
                                    ? "bg-card text-foreground shadow-sm"
                                    : "text-muted hover:text-foreground hover:bg-card/40"
                                }`}
                        >
                            <Waves size={16} className={viewMode === "prediction" ? "text-primary" : "opacity-50"} />
                            실시간 예측 정보
                        </button>

                        {/* AI 최적화 탭 */}
                        <button
                            onClick={() => setDetailViewMode("optimization")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                                ${viewMode === "optimization"
                                    ? "bg-card text-foreground shadow-sm"
                                    : "text-muted hover:text-foreground hover:bg-card/40"
                                }`}
                        >
                            <Sparkles size={16} className={viewMode === "optimization" ? "text-primary" : "opacity-50"} />
                            AI 최적화 스케줄링
                        </button>
                    </div>
                </div>
                {
                    isLoading ?
                        isModalOpen ? <ReservoirModalSkeleton /> : <ReservoirDetailSkeleton />
                        : error ?
                            <ErrorFallback error={error} onClick={() => handleReload()} />
                            :
                            viewMode === "prediction" ? (
                                <>
                                    {isLevelCritical && (
                                        <div className="flex items-center gap-4 bg-danger-bg border border-danger/20 p-4 rounded-3xl animate-pulse">
                                            <div className="bg-danger p-3 rounded-2xl shadow-lg shadow-danger/20">
                                                <AlertTriangle className="text-white w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-danger font-bold text-lg leading-tight">
                                                    {selectedReservoir?.riskStatus === "low" ? "저수위 경보 발생" : "고수위 경보 발생"}
                                                </h4>
                                            </div>
                                            <button className="bg-danger text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                                                즉시 조치
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                        <div className={`glass p-6 rounded-3xl relative overflow-hidden ${isLevelCritical ? "border-danger/30 ring-2 ring-danger/10" : "border-card-border"}`}>
                                            <WaterWave levelPercent={levelPercent} danger={isLevelCritical} />
                                            <div className="relative z-10">
                                                <p className="text-xs text-muted font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <Waves size={14} className={isLevelCritical ? "text-danger" : "text-primary"} /> 현재 수위 현황
                                                </p>
                                                <div className="flex items-end justify-between">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className={`text-4xl font-black ${isLevelCritical ? "text-danger" : "text-foreground"}`}>
                                                            {minuteData?.currentLevel?.toFixed(2)}
                                                        </span>
                                                        <span className="text-muted font-bold text-lg">/ {minuteData?.maxLevel?.toFixed(2)}m</span>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${isLevelCritical ? "bg-danger-bg text-danger border border-danger/20" : "bg-success-bg text-success border border-success/20"}`}>
                                                        {isLevelCritical ? "위험" : "안정"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass p-6 rounded-3xl border border-card-border">
                                            <p className="text-xs text-muted font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <BarChart3 size={14} className="text-primary opacity-80" /> 알고리즘 예측 신뢰도
                                            </p>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-4xl font-black text-foreground">{minuteData?.predictionAccuracy?.toFixed(1)}%</span>
                                                <div className="flex-1 h-3 bg-muted/20 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${minuteData?.predictionAccuracy}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 glass rounded-3xl p-6 flex flex-col border border-card-border">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-bold text-foreground opacity-90 flex items-center gap-2">
                                                <TrendingUp size={20} className="text-success" />수요 예측 추이
                                            </h4>
                                            <div className="flex gap-2">
                                                {["3h", "6h", "12h"].map(t => (
                                                    <button key={t} onClick={() => setSelectedRange(t)} className={`text-[12px] px-4 py-1 rounded-2xl transition-colors ${selectedRange === t ? "bg-primary text-white shadow-md" : "bg-muted/10 text-muted hover:bg-muted/20"}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full" style={{ minHeight: "80px" }}>
                                            <PredictionChart data={filteredChartData} labels={["실제 수요", "예측 수요"]} mode="prediction" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* 최적화 */
                                <>
                                    <div className="grid grid-cols-1 gap-4 p-4 glass rounded-3xl border border-card-border">
                                        <EnergySave />
                                    </div>

                                    <div className="flex-1 glass rounded-3xl p-6 flex flex-col border border-card-border">
                                        <h4 className="font-bold text-foreground opacity-90 flex items-center gap-2 mb-4">
                                            <TrendingUp size={20} className="text-success" />최적화 스케줄링
                                        </h4>
                                        <div className="flex-1 w-full" style={{ minHeight: "80px" }}>
                                            <PredictionChart
                                                data={optimizationData}
                                                labels={["예측 수위", "가동 펌프"]}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
            </div>
        </div>
    );
}