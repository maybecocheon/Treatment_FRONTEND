'use client'

import { Activity, Gauge, WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useFacilitiesData } from '@/hooks/useFacilitiesData';
import { useEffect, useMemo, useState } from 'react';
import { FacilityType } from '@/types/types';
import TailChart from '@/components/main/TailChart';


export default function MainTrend() {
    // 차트 데이터
    const { filteredChartData, loadData } = usePredictionData();
    const { getFilteredFacilities, loadFacilities } = useFacilitiesData();
    const [selectedId, setSelectedId] = useState<FacilityType["facilityId"]>("4");

    const reservoir = useMemo(() =>
        getFilteredFacilities().filter(f => f.type === "배수지"),
        [getFilteredFacilities]
    );

    useEffect(() => {
        loadFacilities();
    }, [])

    useEffect(() => {
        if (selectedId !== undefined) {
            loadData?.(String(selectedId));
        }
    }, [selectedId]);

    return (
        <div className="flex-1 flex flex-col gap-2 w-full h-full mb-4 md:mb-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
                    <Activity className="text-blue-600" size={24} />
                    배수지 및 정수장 운영 추이 (24h)
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
                <ChartBox
                    title="수요 및 수위"
                    icon={WavesIcon}
                    headerControl={
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-[10px] lg:text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-bold"
                        >
                            {reservoir.map(facility => <option key={facility.facilityId} value={facility.facilityId}>{facility.name}</option>)}
                        </select>
                    }
                >
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
                <ChartBox
                    title="펌프 스케줄링 최적화"
                    icon={Gauge}
                    color="text-green-700"
                >
                    <TailChart
                        time={filteredChartData.map(d => d.time || 0)}
                        data={filteredChartData.map(d => d.actualValue || 0)}
                        data2={filteredChartData.map(d => d.predictedValue || 0)}
                        label1="현재 송수량"
                        label2="최적화 송수량"
                    />
                </ChartBox>
            </div >
        </div >
    )
}
