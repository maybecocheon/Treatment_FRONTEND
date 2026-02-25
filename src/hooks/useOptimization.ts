import { useAtomValue } from "jotai";
import { useRefreshTime } from "./useRefreshTime";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useQuery } from "@tanstack/react-query";
import { myFetch } from "@/api/api";
import { useMemo } from "react";

export default function useOptimization() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { roundedTime: date } = useRefreshTime();
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    // 최적화 쿼리 
    const { data: fullResponse, isLoading, error, refetch: loadOptimization } = useQuery({
        queryKey: ["treatmentChartAll", date],
        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/treatment/chart/miniute?date=${date}`);
            if (data.processing) throw new Error("PROCESSING");
            return data;
        },
        enabled: !!date,
        staleTime: 1000 * 60 * 15,
        retry: (count, err: any) => err.message === "PROCESSING" && count < 3,
        retryDelay: 3000,
    });

    // 기존 비용 쿼리 
    const { data, error: costError, refetch: loadCost } = useQuery({
        queryKey: ["energySave", date],
        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/treatment/cost?date=${date}`);
            return data;
        },
        enabled: !!date,
        staleTime: 1000 * 60 * 15,
    });

    // 캐시된 전체 데이터에서 현재 선택된 배수지 데이터만 필터
    const optimizationData = useMemo(() => {
        const chartList = fullResponse?.chartData;
        if (!chartList) return [];

        const reservoirKey = selectedReservoir ? selectedReservoir.reservoirName.slice(0, 1) : null;
        const dynamicKey = reservoirKey ? `level${reservoirKey}` : "";

        return chartList.map((item: any) => ({
            time: item.time.split("T")[1]?.substring(0, 5) || "",
            first: item[dynamicKey] || 0,
            second: item.pumpNum || 0,
        }));
    }, [fullResponse, selectedReservoir]);

    // 비용만 필터
    const costData = useMemo(() => {
        const optimizationCost = fullResponse?.simCost;
        const existingCost = data;
        const savingCost = optimizationCost - existingCost;
        const savingRate = (savingCost / existingCost) * 100;

        if (!existingCost || !optimizationCost) return;

        return { existingCost, optimizationCost, savingCost, savingRate }; 
    }, [fullResponse, data])

    return {
        rawData: fullResponse,
        isLoading, 
        error: error || costError,
        costError,
        costData,
        optimizationData,
        loadOptimization: loadOptimization || loadCost
    };
}