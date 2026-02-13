'use client'

import { myFetch } from "@/api/api";
import { ReservoirHistoryChartType, TreatmentHistoryChartType } from "@/types/types";
import { flow } from "lodash";
import { useState, useCallback } from "react";

export function useHistoryChart() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [treatmentHistoryChart, setTreatmentHistoryChart] = useState<TreatmentHistoryChartType[]>([]);
    const [reservoirHistoryChart, setReservoirHistoryChart]= useState<ReservoirHistoryChartType[]>([]);

    const loadTreatmentHistoryChart = useCallback(async (date: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/treatment/history/chart?date=${date} 00:00:00`);
            setTreatmentHistoryChart(data.map((item: TreatmentHistoryChartType) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                flowOut: item.flowOut || 0,
                pressPipe: item.pressPipe || 0,
            })));
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    const loadReservoirHistoryChart = useCallback(async (id: number, date: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/reservoir/history/chart/${id}?date=${date} 00:00:00`);
            setReservoirHistoryChart(data.map((item: ReservoirHistoryChartType) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                flowOut: item.flowOut || 0,
                level: item.level || 0,
            })));
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    return { treatmentHistoryChart, reservoirHistoryChart, loadReservoirHistoryChart, loadTreatmentHistoryChart, isLoading, error };
}