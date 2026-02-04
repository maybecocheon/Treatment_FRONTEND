'use client';
import { ModalProps } from '@/app/props/ModalProps';
import { Activity, BarChart3, Droplets, Gauge, Waves } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import ChartBox from './ChartBox';


export default function MainTrend({ params }: ModalProps) {
    // 차트 데이터
    const [chartData, setChartData] = useState<Array<{ time: string; actualValue: number | null; predictedValue: number }>>([]);
    const [reservoir, setReservoir] = useState<any>(null);

    // const generateTrend = (base: number, variance: number, points: number = 24) =>
    //     Array.from({ length: points }, () => base + (Math.random() - 0.5) * variance);

    // const trends = useMemo(() => ({
    //     outflow: generateTrend(12000, 2000),
    //     storage: generateTrend(75, 15),
    //     pumpRate: generateTrend(60, 40),
    //     demand: generateTrend(150, 40),
    //     prediction: generateTrend(155, 30),
    //     level: generateTrend(65, 20)
    // }), [params]);

    const router = useRouter();

    const { id } = params;
    // const reservoir = trends?.find(r => r.id === id);

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await fetch(`/api/proxy/reservoir/chart/minite/${id}?date=2023-01-06`);
            const data = await response.json();
            setReservoir(data);
            setChartData(data.chartData.map((item: any, idx: number) => ({
                time: item.time.split("T")[1].substring(0, 5) || "",
                // idx가 cutoffIndex보다 크면 null 처리 (차트 라이브러리에서 보통 공백으로 처리됨)
                actualValue: idx < 1000 ? item.actualValue : null,
                predictedValue: item.predictedValue || 0,
            })));
        };
        fetchChartData();
    }, [id]);

    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                    <Activity className="text-blue-600" size={24} />
                    {reservoir?.category || "Unknown"} 운영 트렌드 (24h)
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {reservoir?.category === "정수장" ? (
                    <ChartBox title="송수량 변동 추이 (m³/h) & 압력" data={chartData.map(d => d.actualValue || 0)} color="#3b82f6" icon={Droplets} />
                ) : (
                    <ChartBox
                        title="수요 (m³/h) & 수위"
                        data={chartData.map(d => d.actualValue || 0)}
                        data2={chartData.map(d => d.predictedValue || 0)}
                        color="#3b82f6"
                        color2="#818cf8"
                        label1="현재 수요"
                        label2="수위"
                        icon={BarChart3}
                    />
                )}

                {(
                    <ChartBox
                        title="펌프 스케줄링 최적화"
                        data={chartData.map(d => d.storage || 0)}
                        data2={chartData.map(d => d.pumpRate || 0)}
                        data3={chartData.map(d => d || 0)}
                        color="#818cf8"
                        color2="#10b981"
                        label1="예측 수위 (%)"
                        label2="예측 수요 (%)"
                        label3="예측 가압"
                        icon={Gauge}
                    />
                )}
            </div>
        </div>
    )
}
