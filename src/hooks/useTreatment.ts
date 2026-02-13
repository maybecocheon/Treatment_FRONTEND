import { myFetch } from "@/api/api";
import { useCallback, useState } from "react";

export interface TreatmentType {
    pressOutAvg: number;
    flowOutAmt: number;
    reservoirCnt: number
}

export function useTreatment() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [treatment, setTreatment] = useState<TreatmentType | null>(null);

    const loadTreatment = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/treatment/now?date=2023-01-06 00:00:01`);
            // throw new Error("dkd")
            setTreatment(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    return { treatment, loadTreatment, isLoading, error };
}
