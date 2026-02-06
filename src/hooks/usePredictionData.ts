'use client'

import { useMemo, useState, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { selectedRangeAtom, virtualTimeAtom } from "@/atoms/uniAtoms";
import { myFetch } from "@/api/api";

export function usePredictionData(id?: string) {
    const [rawChartData, setRawChartData] = useState<any[]>([]);
    const [minuteData, setMinuteData] = useState<any | null>(null);
    const [selectedRange, setSelectedRange] = useAtom(selectedRangeAtom);

    // const time = useAtomValue(virtualTimeAtom);

    // 마지막으로 데이터를 불러온 '분(Minute)'을 저장
    // const lastUpdatedMinute = useRef<string>("");

    const loadData = useCallback(async (id: string) => {
        if (!id) return;

        try {
            // const formattedTime = time.replace("T", " "); // 가상 시계 시간 사용
            const response = await myFetch(`/api/proxy/reservoir/chart/minite/${id}?date=2023-01-06 00:00:00`);
            if (!response) return;
            const data = await response.json();
            setMinuteData(data);
            const chartList = data.chartData ? data.chartData : [];
            setRawChartData(chartList.map((item: any, idx: number) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                actualValue: idx < 1000 ? item.actualValue : null,
                predictedValue: item.predictedValue || 0,
            })));
            // 호출 성공 시 마지막 업데이트 시간(분 단위) 기록
            // lastUpdatedMinute.current = time.split("T")[1]?.substring(0, 5);
        } catch (error) {
            console.error("차트 로딩 실패:", error);
        }
    }, []);

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

    const resetRange = () => setSelectedRange("24h");

    return { filteredChartData, minuteData, loadData, resetRange };
}