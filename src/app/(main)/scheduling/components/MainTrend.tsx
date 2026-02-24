'use client'

import { WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import TailLineChart from '@/components/main/TailLineChart';
import TailCategory from '@/components/main/TailCategory';
import useOptimization from '@/hooks/useOptimization';
import PageFallback from '@/components/skeletons/PageFallback';
import TailChartSkeleton from '@/components/main/skeletons/TailChartSkeleton';
import ErrorFallback from '@/components/skeletons/ErrorFallback';

export default function MainTrend() {
    const { optimizationData, isLoading, error, loadOptimization } = useOptimization();

    return (
        <div className="h-full flex flex-col gap-4">
            {/* 카테고리 */}
            <div className="glass p-3 rounded-3xl">
                <TailCategory text="scheduling" />
            </div>

            {/* 메인 영역 */}
            <div className="flex-1 flex flex-col gap-4">
                <ChartBox title={`최적화 스케줄링에 따른 수위 및 수요 예측`} icon={WavesIcon}>
                    {isLoading ? (
                        <PageFallback skeleton={<TailChartSkeleton />} />
                    ) : error ? (
                        <ErrorFallback error={error} onClick={() => loadOptimization()} />
                    ) : (
                        <TailLineChart
                            data={optimizationData}
                            labels={["펌프 대수", "수위"]}
                        />
                    )}
                </ChartBox>
                <ChartBox title={`최적화 스케줄링에 따른 수위 및 수요 예측`} icon={WavesIcon}>
                    {isLoading ? (
                        <PageFallback skeleton={<TailChartSkeleton />} />
                    ) : error ? (
                        <ErrorFallback error={error} onClick={() => loadOptimization()} />
                    ) : (
                        <TailLineChart
                            data={optimizationData}
                            labels={["펌프 대수", "수위"]}
                        />
                    )}
                </ChartBox>
            </div>
            <hr className="block lg:hidden border-sky-50" />
        </div>
    )
}
