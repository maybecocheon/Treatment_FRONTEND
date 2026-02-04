import Title from '@/components/main/Title';
import Category from '@/components/main/TailCategory';
import GuidePannel from '../components/GuidePanel';
import MainTrend from '../components/MainTrend';

export default async function SchedulingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
            <Title title="지능형 펌프 운영 스케줄링" subtitle="AI 기반 펌프 운영 및 전기 요금 최적화 분석" />

            <div className="flex-1 flex flex-col gap-6">
                {/* 1. 에너지 비용 & 최적화 가이드 섹션 */}
                <GuidePannel params={{ id }} />

                {/* 2. 메인 분석 대시보드 - Charts (Wide Layout) */}
                <MainTrend params={{ id }} />

                {/* 3. 시설 선택 카테고리 (Moved to Bottom) */}
                {/* <div className="flex-col gap-3 mt-4">
                    <Category text="scheduling" params={id} />
                </div> */}
            </div>
        </div>
    );
};