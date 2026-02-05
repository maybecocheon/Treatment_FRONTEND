'use client'

import { Activity, BarChart3, Gauge } from 'lucide-react';
import SchedulingChartBox from './SchedulingChartBox';
import { usePredictionData } from '@/hooks/usePredictionData';


export default function MainTrend() {
    // 차트 데이터
    const { filteredChartData, loadData } = usePredictionData();

    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                    <Activity className="text-blue-600" size={24} />
                    배수지 및 정수장 운영 추이 (24h)
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <SchedulingChartBox
                    title="수요 (m³/h)"
                    time={filteredChartData.map(d => d.time || 0)}
                    data={filteredChartData.map(d => d.actualValue || 0)}
                    data2={filteredChartData.map(d => d.predictedValue || 0)}
                    color="#3b82f6"
                    color2="#818cf8"
                    label1="현재 수요"
                    label2="수요 예측"
                    icon={BarChart3}
                    loadData={(id) => loadData(String(id))}
                />
                <SchedulingChartBox
                    title="펌프 스케줄링 최적화"
                    time={filteredChartData.map(d => d.time || 0)}
                    data={filteredChartData.map(d => d.storage || 0)}
                    data2={filteredChartData.map(d => d.pumpRate || 0)}
                    color="#818cf8"
                    color2="#10b981"
                    label1="현재 송수량"
                    label2="최적화 송수량"
                    icon={Gauge}
                />
            </div>
        </div>
    )
}
