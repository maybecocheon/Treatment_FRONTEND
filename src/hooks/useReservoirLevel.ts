import { myFetch } from "@/api/api";
import { ReservoirLevelType } from "@/types/types";
import { useCallback, useState } from "react";

export function useReservoirLevel() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [reservoirLevels, setReservoirLevels] = useState<ReservoirLevelType[]>([]);

    const loadLevels = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            const data = await myFetch(`${baseUrl}/reservoir/levels?date=2023-01-06 00:00:01`);
            // throw new Error("에러")
            setReservoirLevels(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    return { reservoirLevels, loadLevels, isLoading, error };
}
