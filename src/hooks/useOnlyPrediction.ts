'use client'

import { useMemo, useState } from "react";
import { myFetch } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useRefreshTime } from "./useRefreshTime";
import { useAtomValue } from "jotai";
import { selectedReservoirIdAtom } from "@/atoms/uniAtoms";

export function useOnlyPrediction() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { roundedTime: date } = useRefreshTime();
    const selectedReservoirId = useAtomValue(selectedReservoirIdAtom);

    // 메인 쿼리
    const { isLoading, isFetching, error, refetch: loadOnlyPredictionData, data: fullResponse } = useQuery({
        queryKey: ["OnlyPredictionChart", selectedReservoirId, date],
        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/reservoir/chart/predict/${selectedReservoirId}?date=${date}`);

            // 서버가 계산 중이면 에러 던져서 retry 유도
            if (data.isProcessing) throw new Error("PROCESSING");

            return data;
        },
        enabled: !!selectedReservoirId && selectedReservoirId !== 0 && !!date,
        staleTime: 1000 * 60 * 15, // 15분

        // 재시도 설정 (2초 간격, 최대 5번)
        retry: (failureCount, error: any) => {
            if (error.message === "PROCESSING" && failureCount < 5) return true;
            return false;
        },
        retryDelay: 2000,
    });

    // 차트 데이터 가공
    const onlyPredictionData = useMemo(() => {
        const chartList = fullResponse?.predictList || [];
        return chartList.map((item: any) => ({
            time: item.time.split("T")[1]?.substring(0, 5) || "",
            second: item.predictedValue
        }));
    }, [fullResponse]);

    return {
        loadOnlyPredictionData,
        onlyPredictionData,
        isLoading,
        isFetching,
        error
    };
}