'use client'

import { myFetch } from "@/api/api";
import { ReservoirHistoryType, TreatmentHistoryType } from "@/types/types";
import { useState, useCallback } from "react";

export function useHistory() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [treatmentHistory, setTreatmentHistory] = useState<TreatmentHistoryType>();
    const [reservoirHistory, setReservoirHistory] = useState<ReservoirHistoryType>();

    const loadTreatmentHistory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/treatment/history?date=2023-01-06 00:00:00`);
            setTreatmentHistory(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    const loadReservoirHistory = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/reservoir/history/${id}?date=2023-01-06 00:00:00`);
            setReservoirHistory(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    return { treatmentHistory, reservoirHistory, loadTreatmentHistory, loadReservoirHistory, isLoading, error };
}