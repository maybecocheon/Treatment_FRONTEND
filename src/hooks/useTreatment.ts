import { myFetch } from "@/api/api";
import { useCallback, useEffect, useState } from "react";

export interface TreatmentType {
    pressOutAvg: number;
    flowOutAmt: number;
    reservoirCnt: number
}

export function useTreatment(date: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [treatment, setTreatment] = useState<TreatmentType | null>(null);

    const loadTreatment = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/treatment/now?date=${date}`);
            setTreatment(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl, date]);

    // 의존성 변경 시 데이터 자동 로드
    useEffect(() => {
        loadTreatment();
    }, [loadTreatment])

    return { treatment, loadTreatment, isLoading, error };
}
