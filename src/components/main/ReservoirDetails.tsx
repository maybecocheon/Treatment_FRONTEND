import { isModalOpenAtom, mapDetailOpenAtom, selectedFacilityIdAtom } from '@/atoms/uniAtoms';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useAtomValue } from 'jotai';
import ErrorFallback from '../skeletons/ErrorFallback';
import ReservoirModalSkeleton from './skeletons/ReservoirModalSkeleton';
import ReservoirDetailSkeleton from './skeletons/ReservoirDetailsSkeleton';
import { AlertTriangle, BarChart3, TrendingUp, Waves } from 'lucide-react';
import { WaterWave } from '../WaterWave';
// import TailAreaChart from './TailAreaChart//

export default function ReservoirDetails() {
    const isModalOpen = useAtomValue(isModalOpenAtom);
    const mapOpenDetail = useAtomValue(mapDetailOpenAtom);
    const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

    // 차트 데이터
    const { minuteData, loadPredictionData, filteredChartData, error, selectedRange, setSelectedRange, isLoading }
             = usePredictionData(selectedFacilityId);

    // 고수위 & 저수위
    const maxLevelAlert = minuteData?.maxLevel * 0.8;
    const minLevelAlert = minuteData?.maxLevel * 0.3;
    // 수위 위험 상태 체크
    const isLevelCritical = (minuteData?.currentLevel < minLevelAlert) || (minuteData?.currentLevel > maxLevelAlert);
    const levelPercent = (minuteData?.currentLevel / minuteData?.maxLevel) * 100;

    // 에러 발생 시 처리
    if (error) return (
        <div className="flex items-center justify-center h-screen w-full">
            <ErrorFallback error={error} onClick={() => loadPredictionData()} />
        </div>
    );

    // 데이터가 로드되었지만 비어있는 경우
    if (isLoading || !minuteData) {
        if (isModalOpen) return <ReservoirModalSkeleton />;
        if (mapOpenDetail) return <ReservoirDetailSkeleton />;
        return null;
    }

    return (
        <div className={`flex-1 p-6 overflow-y-auto overflow-x-hidden rounded-b-4xl ${isLevelCritical ? "bg-red-100/50" : "bg-sky-100/50"}`}>
            <div className="h-full flex flex-col">
                {/* 수위 경고 배너 (위험 시에만 노출) */}
                {isLevelCritical && (
                    <div className="mb-4 flex items-center gap-4 bg-red-100 border-2 border-red-200 p-4 rounded-3xl animate-pulse">
                        <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200">
                            <AlertTriangle className="text-white w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-red-900 font-bold text-lg leading-tight">{minuteData?.currentLevel < minLevelAlert ? "저수위 경보 발생" : "고수위 경보 발생"}</h4>
                        </div>
                        <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
                            즉시 조치
                        </button>
                    </div>
                )}

                {/* 상단 요약 카드 */}
                <div className={`grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4`}>
                    <div className={`glass p-6 rounded-3xl transition-colors overflow-hidden ${isLevelCritical ? "border-red-200 ring-2 ring-red-50" : "border-slate-100"}`}>
                        <WaterWave levelPercent={levelPercent} danger={isLevelCritical} />
                        <div className="relative h-full z-2">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Waves size={14} className={isLevelCritical ? "text-red-500" : "text-blue-500"} /> 현재 수위 현황
                            </p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${isLevelCritical ? "text-red-600" : "text-slate-900"}`}>
                                        {minuteData?.currentLevel?.toFixed(2)}
                                    </span>
                                    <span className="text-slate-500 font-bold text-lg">/ {minuteData?.maxLevel?.toFixed(2)}m</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${isLevelCritical ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                                    {isLevelCritical ? "위험" : "안정"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                            <BarChart3 size={14} className="text-indigo-500" /> 알고리즘 예측 신뢰도
                        </p>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-4xl font-black text-slate-900">{minuteData?.predictionAccuracy?.toFixed(1)}%</span>
                            <div className="flex-1 h-3 bg-slate-300 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${minuteData?.predictionAccuracy?.toFixed(1)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 메인 차트 영역 */}
                <div className="flex-1 glass rounded-3xl p-6 flex flex-col">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-500" />수요 예측 추이
                        </h4>
                        <div className="flex flex-col gap-3 items-end">
                            <div className="flex gap-2">
                                {["3h", "6h", "12h"].map(t => (
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
                    <div className="flex-1 w-full" style={{ minHeight: "80px" }}>
                        {/* <TailAreaChart
                            time={filteredChartData.map(d => d.time || 0)}
                            data1={filteredChartData.map(d => d.actualValue || 0)}
                            data2={filteredChartData.map(d => d.predictedValue || 0)}
                            labels={["실 수요", "예측 수요"]}
                            units={[" m³/h", " m³/h"]}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
