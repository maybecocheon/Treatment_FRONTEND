'use client'

import { Activity, Gauge, WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useFacilitiesData } from '@/hooks/useFacilitiesData';
import { useEffect, useState } from 'react';
import TailChart from '@/components/main/TailChart';
import TailSelect from '@/components/TailSelect';


export default function MainTrend() {
    // 차트 데이터
    const { filteredChartData, loadData } = usePredictionData();
    const { facilities, loadFacilities } = useFacilitiesData();
    const [selectedCategory, setSelectedCategory] = useState<string>("A배수지");

    useEffect(() => {
        loadFacilities();
    }, [])

    useEffect(() => {
        const facilityId = facilities.filter(f => f.name === selectedCategory).map(f => f.facilityId);
        loadData(String(facilityId));
    }, [selectedCategory]);

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
                        <TailSelect
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            option={facilities.filter(f => f.type === "배수지").map(f => <option key={f.facilityId} value={f.name}>{f.name}</option>)}
                        />
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
