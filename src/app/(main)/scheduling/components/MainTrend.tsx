'use client'

import { Droplets, Filter, WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import PredictionChart from '@/components/main/PredictionChart';
import PageFallback from '@/components/skeletons/PageFallback';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import ErrorFallback from '@/components/skeletons/ErrorFallback';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedReservoirAtom, selectedReservoirIdAtom } from '@/atoms/uniAtoms';
import { useReservoirLevel } from '@/hooks/useReservoirLevel';
import { useOnlyPrediction } from '@/hooks/useOnlyPrediction';
import FacilitySelect from '@/components/main/FacilitySelect';
import EmptySelection from '@/components/main/EmptySelection';

interface OptimizationProps {
    optimizationData: number[][];
    isLoading: boolean;
    error: Error | null;
    loadOptimization: () => void;
}

export default function MainTrend({ optimizationData, isLoading, error, loadOptimization }: OptimizationProps) {
    const { loadOnlyPredictionData, onlyPredictionData, isLoading: isPredictionLoading, error: predictionError } = useOnlyPrediction();
    const [selectedReservoirId, setSelectedReservoirId] = useAtom(selectedReservoirIdAtom);
    const setSelectedReservoir = useSetAtom(selectedReservoirAtom);
    const { reservoirLevels } = useReservoirLevel();

    useEffect(() => {
        const found = reservoirLevels.find(r => r.facilityId === selectedReservoirId);
        setSelectedReservoir(found || null);
    }, [selectedReservoirId, reservoirLevels, setSelectedReservoir]);

    useEffect(() => {
        return () => {
            setSelectedReservoirId(0);
            setSelectedReservoir(null);
        };
    }, []);

    // ID가 0이거나 null이면 선택되지 않은 상태로 간주
    const isNotSelected = !selectedReservoirId || selectedReservoirId === 0;

    return (
        <div className="h-full flex flex-col gap-4">
            {/* 카테고리 선택 영역 */}
            <div className="glass p-3 rounded-2xl flex items-center gap-3 md:w-auto border border-white/50 shadow-sm">
                <button className="p-3 text-slate-400 hover:text-emerald-500 transition-colors">
                    <Filter className="w-4 h-4" />
                </button>
                <FacilitySelect value={selectedReservoirId} onChange={setSelectedReservoirId} />
            </div>

            {/* 메인 차트 영역 */}
            <div className={`flex-1 flex flex-col gap-4 rounded-3xl transition-all duration-500 ${isNotSelected ? 'bg-slate-50/50 border border-dashed border-slate-200' : ''}`}>
                {isNotSelected ? (
                    <EmptySelection />
                ) : (
                    <>
                        <ChartBox title={`최적화 스케줄링에 따른 예측 수위`} icon={WavesIcon}>
                            {isLoading ? (
                                <PageFallback skeleton={<TailChartSkeleton />} />
                            ) : error ? (
                                <ErrorFallback error={error} onClick={() => loadOptimization()} />
                            ) : (
                                <PredictionChart
                                    data={optimizationData}
                                    labels={["수위", "펌프 대수"]}
                                    second={false}
                                />
                            )}
                        </ChartBox>

                        <ChartBox title={`수요 예측`} icon={Droplets}>
                            {isPredictionLoading ? (
                                <PageFallback skeleton={<TailChartSkeleton />} />
                            ) : predictionError ? (
                                <ErrorFallback error={predictionError} onClick={() => loadOnlyPredictionData()} />
                            ) : (
                                <PredictionChart
                                    data={onlyPredictionData}
                                    labels={["", "예측 수요"]}
                                    mode="prediction"
                                    first={false}
                                />
                            )}
                        </ChartBox>
                    </>
                )}
            </div>
            <hr className="block lg:hidden border-slate-100" />
        </div>
    )
}
