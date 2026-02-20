'use client'

import { useEffect, useState } from "react";
import { Calendar, Droplets, Filter, Gauge, Waves, Zap } from "lucide-react";
import Title from "@/components/main/Title";
import TailAreaChart from "@/components/main/TailAreaChart";
import ChartBox from "@/components/main/ChartBox";
import { useHistory } from "@/hooks/useHistory";
import { StatCard } from "@/components/main/StatCard";
import { FacilityType } from "@/types/types";
import { useFacilities } from "@/hooks/useFacilities";
import TailBarChart from "@/components/main/TailBarChart";
import PageFallback from "@/components/skeletons/PageFallback";
import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";

export default function History() {
    const [selectedDate, setSelectedDate] = useState<string>("2023-12-31");
    const [selectedFacility, setSelectedFacility] = useState<FacilityType["facilityId"]>(1);
    
    const { facilities, isLoading } = useFacilities();
    const { stats, chart, labels, titles, isLoading: isHistoryLoading, error: historyError,
            chartError, isChartLoading, loadHistoryChartData, loadHistoryData } = useHistory(selectedFacility, selectedDate);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* 헤더 영역 */}
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석" />
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
                {stats.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        unit={stat.unit}
                        colorClass={stat.colorClass}
                        loading={isHistoryLoading}
                        error={historyError}
                        onClick={() => loadHistoryData()}
                    />
                ))}
            </div>

            {/* 메인 대시보드 */}
            <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 flex-1 mb-4 md:mb-0">
                    <ChartBox
                        title={titles.chart1}
                        icon={selectedFacility === 1 ? Waves : Droplets}
                        textSize="text-[20px]"
                    >
                        {isChartLoading ? (
                            <PageFallback skeleton={<TailChartSkeleton />} />
                        ) : chartError ? (
                            <ErrorFallback error={chartError} onClick={() => loadHistoryChartData()} />
                        ) : (
                            <TailAreaChart
                                time={chart.time}
                                data1={chart.flow}
                                labels={[labels.chart1]}
                                fills={[true]}
                                units={[" m³/h"]}
                            />
                        )}
                    </ChartBox>
                    <ChartBox
                        title={titles.chart2}
                        icon={Gauge}
                        color={selectedFacility === 1 ? "text-green-700" : "text-cyan-700"}
                        textSize="text-[20px]"
                    >
                        {isChartLoading ? (
                            <PageFallback skeleton={<TailChartSkeleton />} />
                        ) : chartError ? (
                            <ErrorFallback error={chartError} onClick={() => loadHistoryChartData()} />
                        ) : (
                            <TailBarChart
                                time={chart.time}
                                data3={chart.secondary}
                                colors={["", "", selectedFacility === 1 ? "#10b981" : "#36bad1"]}
                                labels={["", "", labels.chart2]}
                                units={[selectedFacility === 1 ? " kgf/㎠" : " m"]}
                            />
                        )}
                    </ChartBox>
                </div>
            </div>
        </>
    )
}
