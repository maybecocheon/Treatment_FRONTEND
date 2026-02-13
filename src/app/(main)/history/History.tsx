'use client'

import { useEffect, useState } from "react";
import { AlertCircle, Calendar, Droplets, Filter, Gauge, Waves, Zap } from "lucide-react";
import Title from "@/components/main/Title";
import TailAreaChart from "@/components/main/TailAreaChart";
import ChartBox from "@/components/main/ChartBox";
import { useHistory } from "@/hooks/useHistory";
import { StatCard } from "@/components/main/StatCard";
import { FacilityType } from "@/types/types";
import { useFacilities } from "@/hooks/useFacilities";
import HistorySkeleton from "./HistorySkeleton";
import { useHistoryChart } from "@/hooks/useHistoryChart";
import TailBarChart from "@/components/main/TailBarChart";

export default function History() {
    const { facilities, loadFacilities, isLoading } = useFacilities();
    const { reservoirHistory, treatmentHistory, loadReservoirHistory, loadTreatmentHistory } = useHistory();
    const { reservoirHistoryChart, treatmentHistoryChart, loadReservoirHistoryChart, loadTreatmentHistoryChart } = useHistoryChart();

    const [selectedDate, setSelectedDate] = useState<string>("2023-12-31");
    const [selectedFacility, setSelectedFacility] = useState<FacilityType["facilityId"]>(1);

    useEffect(() => {
        loadFacilities();
        loadTreatmentHistory(selectedDate);
        loadReservoirHistory(4, selectedDate);
        loadTreatmentHistoryChart(selectedDate);
        loadReservoirHistoryChart(4, selectedDate);
    }, []);

    useEffect(() => {
        loadReservoirHistory(selectedFacility, selectedDate);
        loadReservoirHistoryChart(selectedFacility, selectedDate);
    }, [selectedFacility]);

    useEffect(() => {
        loadTreatmentHistory(selectedDate);
        loadTreatmentHistoryChart(selectedDate);
        loadReservoirHistory(selectedFacility, selectedDate);
        loadReservoirHistoryChart(selectedFacility, selectedDate);
    }, [selectedDate]);


    if (!treatmentHistory || !reservoirHistory) return <HistorySkeleton />;

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* 헤더 영역 */}
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />
                <div className="glass p-3 rounded-2xl flex items-center gap-3 md:w-auto">
                    <button className="p-3 text-slate-500">
                        <Filter className="w-4 h-4" />
                    </button>
                    {/* 카테고리 */}
                    <div className="relative flex-1">
                        <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            name="category"
                            value={selectedFacility}
                            onChange={(e) => setSelectedFacility(Number(e.target.value))}
                        >
                            {
                                isLoading ?
                                    (
                                        <option value="" disabled>
                                            로딩중...
                                        </option>
                                    )
                                    : (
                                        facilities.filter(f => f.type === "정수장" || f.type === "배수지")
                                            .map(f => <option key={f.facilityId} value={f.facilityId}>{f.name}</option>)
                                    )
                            }
                        </select>
                    </div>
                    {/* 날짜 */}
                    <div className="relative max-w-full xl:max-w-60">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="date"
                            value={selectedDate} max={"2023-12-31"}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>

            {/* 요약 카드 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-3">
                {(selectedFacility === 1
                    ? [
                        {
                            icon: <Droplets size={20} />,
                            label: "최고 송수량",
                            value: (treatmentHistory.maxFlowOut ?? -1) < 0 ? "---" : Number(treatmentHistory.maxFlowOut.toFixed(0)).toLocaleString(),
                            unit: "m³/h",
                            color: "bg-blue-100/60 text-blue-700"
                        },
                        {
                            icon: <Gauge size={20} />,
                            label: "평균 압력",
                            value: (treatmentHistory.avgPress ?? -1) < 0 ? "---" : treatmentHistory.avgPress.toFixed(2),
                            unit: "kgf/㎠",
                            color: "bg-green-100/60 text-green-700"
                        },
                        {
                            icon: <Zap size={20} />,
                            label: "소비 전력",
                            value: (treatmentHistory.powerConsumption ?? -1) < 0 ? "---" : Number(treatmentHistory.powerConsumption.toFixed(0)).toLocaleString(),
                            unit: "kWh",
                            color: "bg-yellow-100/60 text-yellow-700"
                        },
                        {
                            icon: <AlertCircle size={20} />,
                            label: "이상 탐지 횟수",
                            value: (treatmentHistory.detectionCnt ?? -1) < 0 ? "---" : treatmentHistory.detectionCnt,
                            unit: "회",
                            color: "bg-red-100/60 text-red-700"
                        },
                    ]
                    : [
                        {
                            icon: <Droplets size={20} />,
                            label: "최고 유출량",
                            value: (treatmentHistory.maxFlowOut ?? -1) < 0 ? "---" : Number(treatmentHistory.maxFlowOut.toFixed(0)).toLocaleString(),
                            unit: "m³/h",
                            color: "bg-blue-100/60 text-blue-700"
                        },
                        {
                            icon: <Waves size={20} />,
                            label: "평균 수위",
                            value: (reservoirHistory.avgLevel ?? -1) < 0 ? "---" : reservoirHistory.avgLevel.toFixed(2),
                            unit: "m",
                            color: "bg-cyan-100/60 text-cyan-700"
                        },
                        {
                            icon: <Zap size={20} />,
                            label: "소비 전력",
                            value: (reservoirHistory.powerConsumption ?? -1) < 0 ? "---" : Number(reservoirHistory.powerConsumption.toFixed(0)).toLocaleString(),
                            unit: "kWh",
                            color: "bg-yellow-100/60 text-yellow-700"
                        },
                        {
                            icon: <AlertCircle size={20} />,
                            label: "이상 탐지 횟수",
                            value: (reservoirHistory.detectionCnt ?? -1) < 0 ? "---" : reservoirHistory.detectionCnt,
                            unit: "회",
                            color: "bg-red-100/60 text-red-700"
                        },
                    ]
                ).map((stat, idx) => (
                    <StatCard
                        key={idx}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        unit={stat.unit}
                        colorClass={stat.color}
                    />
                ))}
            </div>

            {/* 메인 대시보드 */}
            <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 flex-1 mb-4 md:mb-0">
                    <ChartBox
                        title={selectedFacility === 1 ? "시간별 송수량" : "시간별 수요량"}
                        icon={selectedFacility === 1 ? Waves : Droplets}
                        textSize="text-[20px]"
                    >
                        <TailAreaChart
                            time={selectedFacility === 1 ? treatmentHistoryChart.map(d => d.time) : reservoirHistoryChart.map(d => d.time)}
                            data1={selectedFacility === 1 ? treatmentHistoryChart.map(d => d.flowOut) : reservoirHistoryChart.map(d => d.flowOut)}
                            labels={[selectedFacility === 1 ? "송수량" : "수요량"]}
                            fills={[true]}
                            units={[" m³/h"]}
                        />
                    </ChartBox>
                    <ChartBox
                        title={selectedFacility === 1 ? "시간별 토출 압력" : "시간별 수위 변화"}
                        icon={Gauge}
                        color={selectedFacility === 1 ? "text-green-700" : "text-cyan-700"}
                        textSize="text-[20px]"
                    >
                        <TailBarChart
                            time={selectedFacility === 1 ? treatmentHistoryChart.map(d => d.time) : reservoirHistoryChart.map(d => d.time)}
                            data3={selectedFacility === 1 ? treatmentHistoryChart.map(d => d.pressPipe) : reservoirHistoryChart.map(d => d.level)}
                            colors={["", "", selectedFacility === 1 ? "#10b981" : "#36bad1", ""]}
                            labels={["", "", selectedFacility === 1 ? "압력" : "수위"]}
                            units={["", "", selectedFacility === 1 ? " kgf/㎠" : " m"]}
                        />
                    </ChartBox>
                </div>
            </div>
        </>
    )
}
