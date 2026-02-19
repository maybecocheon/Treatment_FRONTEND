import { myFetch } from "@/api/api";
import { ReservoirLevelType } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export function useReservoirLevel(date: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [reservoirLevels, setReservoirLevels] = useState<ReservoirLevelType[]>([]);

    const loadLevels = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            const data = await myFetch(`${baseUrl}/reservoir/levels?date=${date}`);
            setReservoirLevels(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl, date]);

    // 의존성 변경 시 데이터 자동 로드
    useEffect(() => {
        loadLevels();
    }, [loadLevels])

    return { reservoirLevels, loadLevels, isLoading, error };
}
