import Title from '@/components/main/Title';
import GuidePannels from './components/GuidePanels';
import MainTrend from './components/MainTrend';
import { Suspense } from 'react';
import PageFallback from '@/components/skeletons/PageFallback';
import GuidePannelsSkeleton from './skeletons/GuidePannelsSkeleton';

export default async function SchedulingPage() {
    return (
        <div className="flex flex-col h-full gap-4 md:p-4">
            <Title title="지능형 펌프 운영 스케줄링" subtitle="AI 기반 펌프 운영 및 전기 요금 최적화 분석" />

            {/* 좌우 레이아웃 분리 */}
            <div className="h-full grid grid-cols-1 xl:grid-cols-4 gap-4">
                <Suspense fallback={<PageFallback skeleton={<GuidePannelsSkeleton />} />}>
                    <GuidePannels />
                </Suspense>
                <div className="xl:col-span-3 xl:border-l xl:border-slate-200 xl:pl-6">
                    <MainTrend />
                </div>
            </div>
        </div>
    );
};