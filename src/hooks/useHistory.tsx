'use client'

import { myFetch } from "@/api/api";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useFacilities } from "./useFacilities";
import { AlertCircle, Droplets, Gauge, Waves, Zap } from "lucide-react";
import { StatCardType } from "@/types/types";


export function useHistory(facilityId: number, date: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    // 로딩 및 에러 관리
    const [isLoading, setIsLoading] = useState(false);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [chartError, setChartError] = useState<Error | null>(null);

    // 데이터 통합 관리
    const [infoData, setInfoData] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [monthData, setMonthData] = useState<any[]>([]);

    const { facilities, loadFacilities } = useFacilities();

    // 시설 타입 판별
    const facilityType = useMemo(() =>
        facilities.find(f => f.facilityId === facilityId)?.type
        , [facilities, facilityId]);

    const isTreatment = facilityType === "정수장";

    // url 참조 사항
    const formattedDate = `${date} 00:00:00`;
    const prefix = isTreatment ? "treatment" : "reservoir";
    const idPath = isTreatment ? "" : `/${facilityId}`;

    // info 로드 함수
    const loadHistoryData = useCallback(async () => {
        if (!facilityId || !date) return;

        setIsLoading(true);
        setError(null);

        try {
            const info = await myFetch(`${baseUrl}/${prefix}/history/info${idPath}?date=${formattedDate}`);
            setInfoData(info);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl, facilityId, date, isTreatment]);

    // chart 로드 함수
    const loadHistoryChartData = useCallback(async () => {
        if (!facilityId || !date) return;

        setIsChartLoading(true);
        setChartError(null);

        try {
            const chart = await myFetch(`${baseUrl}/${prefix}/history/chart/day${idPath}?date=${formattedDate}`);
            const month = await myFetch(`${baseUrl}/${prefix}/history/chart/month${idPath}?date=${formattedDate}`);

            setChartData(chart.map((item: any) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                flow: item.flowOut || 0,
                secondary: isTreatment ? (item.pressPipe || 0) : (item.level || 0),
            })));

            setMonthData(month.map((item: any) => ({
                time: item.time,
                flow: item.flowOut || 0,
                secondary: isTreatment ? (item.pressPipe || 0) : (item.level || 0),
            })));

        } catch (error: any) {
            setChartError(error);
        } finally {
            setIsChartLoading(false);
        }
    }, [baseUrl, facilityId, date, isTreatment]);

    // 의존성 변경 시 데이터 자동 로드
    useEffect(() => {
        loadFacilities();
    }, [loadFacilities]);

    useEffect(() => {
        loadHistoryData();
        loadHistoryChartData();
    }, [loadHistoryData, loadHistoryChartData]);

    // UI 최적화 데이터 가공
    const stats: StatCardType[] = useMemo(() => {
        if (!infoData) return [];

        const commonStats = [
            {
                icon: <Zap size={20} />,
                label: "소비 전력",
                value: infoData.powerConsumption?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "---",
                unit: "kWh",
                colorClass: "bg-yellow-100/60 text-yellow-700"
            },
            {
                icon: <AlertCircle size={20} />,
                label: "이상 탐지",
                value: infoData.detectionCnt ?? 0,
                unit: "회",
                colorClass: "bg-red-100/60 text-red-700"
            },
        ];

        if (isTreatment) {
            return [
                {
                    icon: <Droplets size={20} />,
                    label: "최고 송수량",
                    value: infoData.maxFlowOut?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "---",
                    unit: "m³/h",
                    colorClass: "bg-blue-100/60 text-blue-700"
                },
                {
                    icon: <Gauge size={20} />,
                    label: "평균 압력",
                    value: infoData.avgPress?.toFixed(2) ?? "---",
                    unit: "kgf/㎠",
                    colorClass: "bg-green-100/60 text-green-700"
                },
                ...commonStats
            ];
        } else {
            return [
                {
                    icon: <Droplets size={20} />,
                    label: "최고 유출량",
                    value: infoData.maxFlowOut?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "0",
                    unit: "m³/h",
                    colorClass: "bg-blue-100/60 text-blue-700"
                },
                {
                    icon: <Waves size={20} />,
                    label: "평균 수위",
                    value: infoData.avgLevel?.toFixed(2) ?? "0.00",
                    unit: "m",
                    colorClass: "bg-cyan-100/60 text-cyan-700"
                },
                ...commonStats
            ];
        }
    }, [infoData, isTreatment]);

    return {
        stats,
        chartData,
        monthData,
        labels: isTreatment ? ["송수량", "압력"] : ["수요량", "수위"],
        titles: isTreatment ? ["당월 송수량 및 토출 압력", "당일 송수량 및 토출 압력"] : ["당월 수요량 및 수위", "당일 수요량 및 수위"],
        isLoading,
        error,
        isChartLoading,
        chartError,
        loadHistoryData,
        loadHistoryChartData,
    };
}