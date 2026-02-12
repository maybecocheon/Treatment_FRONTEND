'use client'

import { useMemo, useState, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { selectedRangeAtom, virtualTimeAtom } from "@/atoms/uniAtoms";
import { myFetch } from "@/api/api";

export function usePredictionData(id?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [rawChartData, setRawChartData] = useState<any[]>([]);
    const [minuteData, setMinuteData] = useState<any | null>(null);
    const [selectedRange, setSelectedRange] = useState("24h");

    // const time = useAtomValue(virtualTimeAtom);

    // 마지막으로 데이터를 불러온 '분(Minute)'을 저장
    // const lastUpdatedMinute = useRef<string>("");

    const loadData = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            // const formattedTime = time.replace("T", " "); // 가상 시계 시간 사용
            const data = await myFetch(`${baseUrl}/reservoir/chart/minite/${id}?date=2023-01-06 00:00:00`);
            setMinuteData(data);
            const chartList = data.chartData ? data.chartData : [];
            setRawChartData(chartList.map((item: any, idx: number) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                actualValue: idx < 1000 ? item.actualValue : null,
                predictedValue: item.predictedValue || 0,
            })));

            // 호출 성공 시 마지막 업데이트 시간(분 단위) 기록
            // lastUpdatedMinute.current = time.split("T")[1]?.substring(0, 5);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    // 1분 단위 자동 갱신 로직
    // useEffect(() => {
    //     if (!id) return;

    //     const currentMinute = time.split("T")[1]?.substring(0, 5);

    //     if (currentMinute && currentMinute !== lastUpdatedMinute.current) {
    //         console.log(`${currentMinute}분 데이터 갱신 중...`);
    //         loadData(id);
    //     }
    // }, [time, id, loadData]);

    // 데이터 필터링 로직
    const filteredChartData = useMemo(() => {
        const rangeMap: Record<string, number> = { "3h": 180, "6h": 360, "24h": 1440 };
        const limit = rangeMap[selectedRange] || rawChartData.length;
        return rawChartData.slice(-limit);
    }, [rawChartData, selectedRange]);

    return { filteredChartData, minuteData, loadData, isLoading, error, selectedRange, setSelectedRange };
}