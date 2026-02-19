'use client'

import { BarChart3, Droplets, Waves, X, AlertTriangle, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { usePredictionData } from "@/hooks/usePredictionData";
import TailAreaChart from "@/components/main/TailAreaChart";
import ReservoirDetailsSkeleton from "./skeletons/ReservoirDetailsSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import { isModalOpenAtom, selectedFacilityIdAtom } from "@/atoms/uniAtoms";
import { useAtom } from "jotai";
import { createPortal } from "react-dom";

export default function ReservoirDetailsModal() {
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [selectedFacilityId, setSelectedFacilityId] = useAtom(selectedFacilityIdAtom);

    // 차트 데이터
    const { minuteData, loadPredictionData, filteredChartData, error, selectedRange, setSelectedRange, isLoading } = usePredictionData(selectedFacilityId, "2023-01-01 00:00:00");
    
    // 모달이 마운트(열림)될 때 스크롤 방지 & fetch 차트데이터
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { { document.body.style.overflow = "auto" }; }
    }, [isModalOpen, selectedFacilityId]);

    const onClose = () => {
        setIsModalOpen(false);
        setSelectedFacilityId(0);
    }

    // 브라우저 "뒤로가기" 클릭 시 모달 닫기
    useEffect(() => {
        const handlePopState = () => onClose();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    // 고수위 & 저수위
    const maxLevelAlert = minuteData?.maxLevel * 0.8;
    const minLevelAlert = minuteData?.maxLevel * 0.3;
    // 수위 위험 상태 체크
    const isLevelCritical = (minuteData?.currentLevel < minLevelAlert) || (minuteData?.currentLevel > maxLevelAlert);

    if (!isModalOpen) return null;

    // 에러 발생 시 처리
    if (error) return (
        <div className="flex items-center justify-center h-screen w-full">
            <ErrorFallback error={error} onClick={() => loadPredictionData()} />
        </div>
    );

    // 데이터가 로드되었지만 비어있는 경우
    if (isLoading || !minuteData) return <ReservoirDetailsSkeleton />;

    return createPortal(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white/60 rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
                {/* 헤더 */}
                <div className="px-6 py-4 md:py-8 flex justify-between items-center transition-colors duration-500 bg-sky-50/50">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isLevelCritical ? "bg-red-400" : "bg-blue-500/20"}`}>
                            <Droplets className={`${isLevelCritical ? "text-red-100" : "text-blue-400"} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                                {minuteData.reservoirName} 상세 정보
                            </h3>
                            <p className={`${isLevelCritical ? "text-red-400" : "text-slate-400"} text-xs md:text-sm font-medium`}>
                                {isLevelCritical ? "즉각적인 펌프 가동 검토가 필요합니다" : "실시간 재산출 기반 용수 수요 예측 현황"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-900 hover:text-white transition-all hover:bg-white/10 p-2.5 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                {/* 메인 */}
                <div className="p-4 md:p-6 overflow-y-auto bg-slate-50/30">
                    {/* 수위 경고 배너 (위험 시에만 노출) */}
                    {isLevelCritical && (
                        <div className="mb-4 flex items-center gap-4 bg-red-50 border-2 border-red-100 p-6 rounded-3xl animate-pulse">
                            <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200">
                                <AlertTriangle className="text-white w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-red-900 font-bold text-lg leading-tight">{minuteData.currentLevel < minLevelAlert ? "저수위 경보 발생" : "고수위 경보 발생"}</h4>
                                <p className="hidden md:block text-red-600 text-sm font-medium">
                                    현재 수위가 설정된
                                    {minuteData.currentLevel < minLevelAlert ?
                                        ` 최저치(${minLevelAlert.toFixed(2)}m)보다 낮습니다. 공급 부족이 예상됩니다.` : ` 최고치(${maxLevelAlert.toFixed(2)}m)보다 높습니다. 공급 과잉이 예상됩니다.`}
                                </p>
                            </div>
                            <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
                                즉시 조치
                            </button>
                        </div>
                    )}

                    {/* 상단 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className={`glass p-6 rounded-3xl transition-colors ${isLevelCritical ? "border-red-200 ring-2 ring-red-50" : "border-slate-100"}`}>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Waves size={14} className={isLevelCritical ? "text-red-500" : "text-blue-500"} /> 현재 수위 현황
                            </p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${isLevelCritical ? "text-red-600" : "text-slate-900"}`}>
                                        {minuteData.currentLevel.toFixed(2)}
                                    </span>
                                    <span className="text-slate-500 font-bold text-lg">/ {minuteData.maxLevel.toFixed(2)}m</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${isLevelCritical ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                                    {isLevelCritical ? "위험" : "안정"}
                                </span>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <BarChart3 size={14} className="text-indigo-500" /> 알고리즘 예측 신뢰도
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-4xl font-black text-slate-900">{minuteData.predictionAccuracy.toFixed(1)}%</span>
                                <div className="flex-1 h-3 bg-slate-300 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${minuteData.predictionAccuracy.toFixed(1)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메인 차트 영역 */}
                    <div className="glass rounded-4xl p-6 mb-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-500" />수요량 및 수위 예측 추이
                            </h4>
                            <div className="flex flex-col gap-3 items-end">
                                <div className="flex gap-2">
                                    {["3h", "6h", "24h"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedRange(t)}
                                            className={`text-[12px] px-4 py-1 rounded-2xl transition-colors ${selectedRange === t ?
                                                "bg-sky-500 text-white shadow-md"
                                                : "bg-slate-200 text-slate-500 hover:bg-slate-100"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="h-75 w-full">
                            <TailAreaChart
                                time={filteredChartData.map(d => d.time || 0)}
                                data1={filteredChartData.map(d => d.actualValue || 0)}
                                data2={filteredChartData.map(d => d.predictedValue || 0)}
                                labels={["실 수요", "예측 수요"]}
                                units={[" m³/h", " m³/h"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}