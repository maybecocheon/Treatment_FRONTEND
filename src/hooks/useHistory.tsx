'use client'

import { myFetch } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useFacilities } from "./useFacilities";
import { AlertCircle, Droplets, Gauge, Waves, Zap } from "lucide-react";
import { StatCardType } from "@/types/types";
import { useMemo } from "react";

export function useHistory(facilityId: number, date: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { facilities } = useFacilities();
    const currentMonth = useMemo(() => {
        if (!date) return "";
        return date.substring(0, 7); // "2024-05-20" -> "2024-05"
    }, [date]);

    // 1. 시설 타입 판별
    const facilityType = useMemo(() =>
        facilities.find(f => f.facilityId === facilityId)?.type
        , [facilities, facilityId]);

    const isTreatment = facilityType === "정수장";
    const prefix = isTreatment ? "treatment" : "reservoir";
    const idPath = isTreatment ? "" : `/${facilityId}`;

    // 2. Info 데이터 쿼리
    const { data: infoData, isLoading: isInfoLoading, isFetching: isInfoFetching, error: infoError, refetch: loadHistoryData } = useQuery({
        queryKey: [prefix, "history", "info", facilityId, date],
        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/${prefix}/history/info${idPath}?date=${date} 00:00:00`);
            return data;
        },
        enabled: !!facilityId && !!date && !!facilityType, // 시설 타입 확인된 후 실행
        staleTime: 1000 * 60 * 60,
    });

    // 3. 차트 데이터 (월간) 쿼리
    const { data: month, isLoading: isMonthLoading, isFetching: isMonthFetching, error: monthError, refetch: loadHistoryMonthData } = useQuery({
        queryKey: [prefix, "history", "month", facilityId, currentMonth],

        queryFn: async () => {
            const monthData = await myFetch(`${baseUrl}/${prefix}/history/chart/month${idPath}?date=${date} 00:00:00`);

            return monthData.map((item: any) => ({
                time: item.time,
                first: isTreatment ? (item.flowOut || 0) : (item.level || 0),
                second: isTreatment ? (item.pressPipe || 0) : (item.flowOut || 0),
            }));
        },
        // currentMonth가 존재할 때만 실행
        enabled: !!facilityId && !!currentMonth && !!facilityType,
        staleTime: 1000 * 60 * 60,
    });

    // 4. 차트 데이터 (일간) 쿼리
    const { data: day, isLoading: isDayLoading, isFetching: isDayFetching, error: dayError, refetch: loadHistoryDayData } = useQuery({
        queryKey: [prefix, "history", "day", facilityId, date],

        queryFn: async () => {
            const day = await myFetch(`${baseUrl}/${prefix}/history/chart/day${idPath}?date=${date} 00:00:00`);

            return day.map((item: any) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                first: isTreatment ? (item.flowOut || 0) : (item.level || 0),
                second: isTreatment ? (item.pressPipe || 0) : (item.flowOut || 0),
            }));
        },
        enabled: !!facilityId && !!date && !!facilityType,
        staleTime: 1000 * 60 * 60,
    });

    // 5. UI 통계 데이터 가공
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

        const treatmentStats = [
            { icon: <Droplets size={20} />, label: "최고 송수량", value: infoData.maxFlowOut?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "---", unit: "m³/h", colorClass: "bg-blue-100/60 text-blue-700" },
            { icon: <Gauge size={20} />, label: "평균 압력", value: infoData.avgPress?.toFixed(2) ?? "---", unit: "kgf/㎠", colorClass: "bg-green-100/60 text-green-700" },
            ...commonStats
        ];

        const reservoirStats = [
            { icon: <Droplets size={20} />, label: "최고 유출량", value: infoData.maxFlowOut?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "0", unit: "m³/h", colorClass: "bg-blue-100/60 text-blue-700" },
            { icon: <Waves size={20} />, label: "평균 수위", value: infoData.avgLevel?.toFixed(2) ?? "0.00", unit: "m", colorClass: "bg-cyan-100/60 text-cyan-700" },
            ...commonStats
        ];

        return isTreatment ? treatmentStats : reservoirStats;
    }, [infoData, isTreatment]);

    return {
        stats,
        dayData: day ?? [],
        monthData: month ?? [],
        labels: isTreatment ? ["송수량", "압력"] : ["수위", "수요량"],
        titles: isTreatment ? ["당월 송수량 및 토출 압력", "당일 송수량 및 토출 압력"] : ["당월 수요량 및 수위", "당일 수요량 및 수위"],
        isInfoLoading,
        isDayLoading,
        isMonthLoading,
        isInfoFetching,
        isDayFetching,
        isMonthFetching,
        infoError,
        dayError,
        monthError,
        loadHistoryData,
        loadHistoryDayData,
        loadHistoryMonthData,
    };
}