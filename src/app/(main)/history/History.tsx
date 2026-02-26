'use client'

import { useState } from "react";
import { Calendar, CalendarDays, Clock, Filter } from "lucide-react";
import Title from "@/components/main/Title";
import ChartBox from "@/components/main/ChartBox";
import { useHistory } from "@/hooks/useHistory";
import { StatCard } from "@/components/main/StatCard";
import { FacilityType } from "@/types/types";
import PageFallback from "@/components/skeletons/PageFallback";
import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import HistoryChart from "@/components/main/HistoryChart";
import FacilitySelect from "@/components/main/FacilitySelect";

export default function History() {
    const [selectedDate, setSelectedDate] = useState<string>("2023-12-31");
    const [selectedFacility, setSelectedFacility] = useState<FacilityType["facilityId"]>(1);

    const { stats, chartData, monthData, labels, titles, isInfoLoading, infoError,
        chartError, isChartLoading, loadHistoryChartData, loadHistoryData } = useHistory(selectedFacility, selectedDate);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* 헤더 영역 */}
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석" />
                <div className="p-3 rounded-2xl flex items-center gap-3 md:w-auto">
                    <button className="p-3 text-muted">
                        <Filter className="w-4 h-4" />
                    </button>
                    {/* 카테고리 */}
                    <FacilitySelect value={selectedFacility} onChange={setSelectedFacility} filterTypes={["정수장", "배수지"]} />
                    {/* 날짜 */}
                    <div className="relative max-w-full xl:max-w-60">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="date"
                            value={selectedDate} max={"2023-12-31"}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-muted/10 border border-card-border rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
                {/* 메인 대시보드 */}
                {/* 월 차트 */}
                <ChartBox
                    title={titles[0]}
                    icon={CalendarDays}
                    textSize="text-[20px]"
                >
                    {isChartLoading ? (
                        <PageFallback skeleton={<TailChartSkeleton />} />
                    ) : chartError ? (
                        <ErrorFallback error={chartError} onClick={() => loadHistoryChartData()} />
                    ) : (
                        <HistoryChart
                            data={monthData}
                            isTreatment={selectedFacility === 1 ? true : false}
                            isMonthly={true}
                            labels={labels}
                        />
                    )}
                </ChartBox>

                <div className="flex flex-col gap-3 w-full border-t border-card-border pt-4 xl:border-l xl:border-t-0 xl:pt-0 xl:pl-4">
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
                                loading={isInfoLoading}
                                error={infoError}
                                onClick={() => loadHistoryData()}
                            />
                        ))}
                    </div>
                    {/* 일 차트 */}
                    <ChartBox
                        title={titles[1]}
                        icon={Clock}
                        color="text-green-700"
                        textSize="text-[20px]"
                    >
                        {isChartLoading ? (
                            <PageFallback skeleton={<TailChartSkeleton />} />
                        ) : chartError ? (
                            <ErrorFallback error={chartError} onClick={() => loadHistoryChartData()} />
                        ) : (
                            <HistoryChart
                                data={chartData}
                                isTreatment={selectedFacility === 1 ? true : false}
                                isMonthly={false}
                                labels={labels}
                            />
                        )}
                    </ChartBox>
                </div>
            </div>
        </>
    )
}
