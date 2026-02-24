import { useAtomValue } from "jotai";
import { useRefreshTime } from "./useRefreshTime";
import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useQuery } from "@tanstack/react-query";
import { myFetch } from "@/api/api";

export default function useOptimization() {
    const { roundedTime: date } = useRefreshTime();
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const reservoir = selectedReservoir ? selectedReservoir.reservoirName.slice(0, 1) : null;

    const { data: optimizationData, isLoading, isFetching, error, refetch: loadOptimization } = useQuery({
        queryKey: ["treatmentChart", date, reservoir], 
        queryFn: async () => {
            const data = await myFetch(`https://10.125.121.185:8443/treatment/test?date=${date}`);
            console.log(data)
            if (data.processing) throw new Error("PROCESSING");
            return data.chartData;
        },
        enabled: !!date,
        staleTime: 1000 * 60 * 15,
        retry: (count, err: any) => err.message === "PROCESSING" && count < 3,
        retryDelay: 15000,

        // ✅ 동적 키 접근 로직
        select: (rawData) => {
            if (!rawData) return [];
            
            return rawData.map((item: any) => {
                const dynamicKey = reservoir ? `level${reservoir}` : ""; 
                
                return {
                    time: item.time.split("T")[1]?.substring(0, 5) || "",
                    first: item.pumpNum || 0, 
                    second: item[dynamicKey],
                };
            });
        }
    });

    return { 
        isLoading: isLoading || (isFetching && !optimizationData), 
        error, 
        optimizationData, 
        loadOptimization
    };
}