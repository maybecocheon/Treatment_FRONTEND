import Title from '@/components/main/Title';
import GuidePannels from './components/GuidePanels';
import MainTrend from './components/MainTrend';

export default async function SchedulingPage() {
    return (
        <div className="flex flex-col h-full gap-4 md:p-4">
            <Title title="지능형 펌프 운영 스케줄링" subtitle="AI 기반 펌프 운영 및 전기 요금 최적화 분석" />

            <div className="flex-1 flex flex-col gap-4 w-full">
                {/* 1. 에너지 비용 & 최적화 가이드 섹션 */}
                <GuidePannels />

                {/* 2. 메인 분석 대시보드 - Charts (Wide Layout) */}
                <MainTrend />
            </div>
        </div>
    );
};