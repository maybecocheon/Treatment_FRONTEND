'use client'

import { DollarSign, Gauge, WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useFacilities } from '@/hooks/useFacilities';
import { useEffect, useState } from 'react';
import TailChart from '@/components/main/TailAreaChart';
import TailCategory from '@/components/main/TailCategory';
import { selectedReservoirAtom } from '@/atoms/uniAtoms';
import { useAtomValue } from 'jotai';

export default function MainTrend() {
    const { filteredChartData } = usePredictionData();
    const { facilities, loadFacilities } = useFacilities();
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    useEffect(() => { loadFacilities(); }, [])

    useEffect(() => {
        const facilityId = facilities.find(f => f.facilityId === selectedReservoir?.facilityId)?.facilityId;
        if (facilityId) loadData(String(facilityId));
    }, [selectedReservoir, facilities]);

    return (
        <div className="h-full flex flex-col gap-4">
            {/* 카테고리 */}
            <div className="glass p-3 rounded-3xl">
                <TailCategory text="scheduling" />
            </div>

            {/* 메인 영역 */}
            <div className="flex-1 flex flex-col gap-4">

                {/* LEFT: 그래프 */}
                    <ChartBox title={`${selectedReservoir?.name} 최적화 스케줄링에 따른 수요 및 수위 예측`} icon={WavesIcon}>
                        <TailChart
                            time={filteredChartData.map(d => d.time || 0)}
                            data={filteredChartData.map(d => d.actualValue || 0)}
                            data2={filteredChartData.map(d => d.predictedValue || 0)}
                            data3={[1, 2, 3, 4, 5, 6]}
                            data4={[6, 1, 2, 5, 4, 5]}
                            label1="현재 수요"
                            label2="수요 예측"
                            label3="현재 수위"
                            label4="수위 예측"
                        />
                    </ChartBox>
            </div>
            <hr className="block lg:hidden border-sky-50" />
        </div>
    )
}
