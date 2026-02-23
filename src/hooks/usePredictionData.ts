'use client'

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { virtualTimeAtom } from "@/atoms/uniAtoms";
import { myFetch } from "@/api/api";
import dayjs from "dayjs";

export function usePredictionData(id: number) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [rawChartData, setRawChartData] = useState<any[]>([]);
    const [minuteData, setMinuteData] = useState<any | null>(null);
    const [selectedRange, setSelectedRange] = useState("12h");

    const time = useAtomValue(virtualTimeAtom);
    const timeRef = useRef(time);
    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    const lastUpdatedMinute = useRef<string>("");

    const loadPredictionData = useCallback(async () => {
        if (!id || id === 0) return;

        // 함수가 호출되는 시점의 최신 date 생성
        const m = dayjs(timeRef.current);
        const roundedMinutes = Math.floor(m.minute() / 15) * 15;

        const currentDate = m
            .minute(roundedMinutes)
            .second(0)
            .format("YYYY-MM-DD HH:mm:ss");

        setIsLoading(true);
        setError(null);

        const fetchData = async (targetDate: string, retriesRemaining: number): Promise<any> => {
            const data = await myFetch(`${baseUrl}/reservoir/chart/${id}?date=${targetDate}`);
            if (data.isProcessing && retriesRemaining > 0) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return fetchData(targetDate, retriesRemaining - 1);
            }
            return data;
        };

        try {
            const data = await fetchData(currentDate, 5);

            if (data.isProcessing) throw new Error("시간 초과");

            // 성공 시점에 '분' 기록
            lastUpdatedMinute.current = timeRef.current.split("T")[1]?.substring(0, 5);

            setMinuteData(data);
            const chartList = data.chartData ? data.chartData : [];
            setRawChartData(chartList.map((item: any, idx: number) => ({
                time: item.time.split("T")[1]?.substring(0, 5) || "",
                actualValue: item.actualValue,
                predictedValue: item.predictedValue,
            })));
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl, id]);

    // 15분 단위 자동 갱신 로직
    useEffect(() => {
        if (!id) return;

        const timePart = time.split("T")[1];
        if (!timePart) return;

        const currentMinute = timePart.substring(0, 5);
        const minuteOnly = parseInt(currentMinute.substring(3, 5)); // 15 (숫자)

        if (minuteOnly % 15 === 0 && currentMinute !== lastUpdatedMinute.current) {
            loadPredictionData();
        }
    }, [time, id, loadPredictionData]);

    // 데이터 필터링 로직
    const filteredChartData = useMemo(() => {
        // 1. 선택한 범위에 따른 데이터 개수
        const rangeMap: Record<string, number> = { "3h": 180, "6h": 360, "12h": 720 };
        const limit = rangeMap[selectedRange] || 720;

        // 2. 현재 시간 'HH:mm' 형식 추출
        if (!time) return [];
        const currentTimeStr = time.split(" ")[1]?.substring(0, 5);

        // 3. 현재 시간과 일치하는 인덱스 찾기
        const currentIndex = rawChartData.findIndex(d => d.time === currentTimeStr);

        if (currentIndex === -1) return [];

        // 4. 데이터 가공
        return rawChartData.slice(0, currentIndex + limit).map((d, index) => {
            return {
                ...d,
                actualValue: index <= currentIndex ? d.actualValue : null,
                predictedValue: (index >= currentIndex && index < currentIndex + limit)
                    ? d.predictedValue
                    : null,
            };
        });
    }, [rawChartData, selectedRange, time]);

    // 의존성 변경 시 데이터 자동 로드
    useEffect(() => {
        if (id !== 0) loadPredictionData();
    }, [loadPredictionData])

    return { filteredChartData, minuteData, setMinuteData, loadPredictionData, isLoading, error, selectedRange, setSelectedRange };
}