'use client'

import { useEffect, useState } from "react";
import { PumpSchedulePanel } from "./PumpSchedulePanel";
import { RiskDetailPanel } from "./RiskDetailPanel";
import { RiskEventPanel } from "./RiskEventPanel";
import { KPIData, PredictionPoint, PumpScheduleItem, RiskEvent, RiskFactor } from "@/data/types";
import { generateMockKPIData, generatePredictionData, generatePumpSchedule, generateRiskEvents, generateRiskFactors } from "@/data/mockData";
import KPICardRow from "./KPICardRow";
import PredictionPanel from "./PredictionPanel";

export default function Dashboard() {
    const [kpi, setKpi] = useState<KPIData | null>(null);
    const [events, setEvents] = useState<RiskEvent[]>([]);
    // const [predictionData, setPredictionData] = useState<PredictionPoint[]>([]);
    const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
    const [schedule, setSchedule] = useState<PumpScheduleItem[]>([]);
    const [selectedReservoir, setSelectedReservoir] = useState('배수지 B');

    useEffect(() => {
        // Initial data load
        setKpi(generateMockKPIData());
        setEvents(generateRiskEvents());
        // fetchPredictionData({ setReservoir, setRawChartData, id: "10" });
        setRiskFactors(generateRiskFactors());
        setSchedule(generatePumpSchedule());
    }, [selectedReservoir]);

    if (!kpi) return null;

    return (
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-3 min-h-0 overflow-y-auto lg:overflow-hidden">

            {/* 왼쪽 섹션 */}
            <div className="lg:col-span-8 flex flex-col gap-2 lg:gap-3 min-h-0">

                {/* Row 1: 현재 상태 요약 (KPI Cards) */}
                <div className="shrink-0">
                    <KPICardRow data={kpi} />
                </div>

                {/* Row 3: 예측 */}
                <div className="flex-1 min-h-75 lg:min-h-0">
                    <PredictionPanel />
                </div>

                {/* Row 4: 펌프 스케줄링 */}
                <div className="flex-1 min-h-75 lg:min-h-0">
                    <PumpSchedulePanel schedule={schedule} />
                </div>

            </div>

            {/* Right/Side Column (4/12) */}
            <div className="flex-1 lg:col-span-4 flex flex-col gap-2 lg:gap-3">

                {/* Row 4: Risk Events - Flexible height (slightly more priority) */}
                <div className="flex-[1.4] min-h-87.5 lg:min-h-0">
                    <RiskEventPanel events={events} />
                </div>

                {/* Row 5: Risk Detailed Score - Flexible height */}
                <div className="flex-1 min-h-62.5 lg:min-h-0">
                    <RiskDetailPanel factors={riskFactors} totalScore={kpi.riskScore} />
                </div>

            </div>
        </div>
    )
}
