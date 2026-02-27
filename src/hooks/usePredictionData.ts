'use client'

import { useMemo, useState } from "react";
import { myFetch } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useRefreshTime } from "./useRefreshTime";
import { useAtomValue } from "jotai";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";

export function usePredictionData() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { roundedTime: date } = useRefreshTime();
    const [selectedRange, setSelectedRange] = useState("12h");
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    // 메인 쿼리
    const { isLoading, isFetching, error, refetch: loadPredictionData, data: fullResponse } = useQuery({
        queryKey: ["predictionChart", selectedReservoir?.facilityId, date],
        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/reservoir/chart/${selectedReservoir?.facilityId}?date=${date}`);

            // 서버가 계산 중이면 에러 던져서 retry 유도
            if (data.isProcessing) throw new Error("PROCESSING");

            return data;
        },
        enabled: !!selectedReservoir?.facilityId && selectedReservoir?.facilityId !== 0 && !!date,
        staleTime: 1000 * 60 * 15, // 15분

        // 재시도 설정 (2초 간격, 최대 5번)
        retry: (failureCount, error: any) => {
            if (error.message === "PROCESSING" && failureCount < 5) return true;
            return false;
        },
        retryDelay: 2000,
    });

    // 차트 데이터 가공
    const rawChartData = useMemo(() => {
        const chartList = fullResponse?.chartData || [];
        return chartList.map((item: any, index: number) => ({
            time: item.time.split("T")[1]?.substring(0, 5) || "",
            first: item.actualValue,
            second: index >= 720 ? item.predictedValue : null
        }));
    }, [fullResponse]);

    // 3. 차트 필터링 로직 (현재 시간 기준 slice)
    const filteredChartData = useMemo(() => {
        if (!date || rawChartData.length === 0) return [];

        const rangeMap: Record<string, number> = { "3h": 180, "6h": 360, "12h": 720 };
        const limit = rangeMap[selectedRange] || 720;
        const currentTimeStr = date.split(" ")[1]?.substring(0, 5);

        const currentIndex = rawChartData.findIndex((d: any) => d.time === currentTimeStr);
        if (currentIndex === -1) return [];

        return rawChartData.slice(0, currentIndex + limit).map((d: any, index: number) => ({
            ...d,
            actualValue: index <= currentIndex ? d.actualValue : null,
            predictedValue: (index >= currentIndex && index < currentIndex + limit)
                ? d.predictedValue
                : null,
        }));
    }, [rawChartData, selectedRange, date]);

    return {
        filteredChartData,
        minuteData: fullResponse,
        loadPredictionData,
        isLoading,
        isFetching,
        error,
        selectedRange,
        setSelectedRange
    };
}