'use client'

import { myFetch } from '@/api/api';
import { virtualTimeAtom } from '@/atoms/uniAtoms';
import { ReservoirLevelType } from '@/types/types';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react'

export function useAllPrediction() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [predictions, setPredictions] = useState<{facilityId: number, predictedValue: number}[]>([]);

    const time = useAtomValue(virtualTimeAtom);
    const timeRef = useRef(time);
    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    const lastUpdatedMinute = useRef<string>("");

    const loadPredictionAll = useCallback(async () => {
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
            const data = await myFetch(`${baseUrl}/reservoir/predict?date=${targetDate}`);
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
            lastUpdatedMinute.current = timeRef.current.split(" ")[1]?.substring(0, 5);

            setPredictions(data.predictData);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    // 15분 단위 자동 갱신 로직
    useEffect(() => {
        const timePart = time.split(" ")[1];
        if (!timePart) return;

        const currentMinute = timePart.substring(0, 5);
        const minuteOnly = parseInt(currentMinute.substring(3, 5)); // 15 (숫자)

        if (minuteOnly % 15 === 0 && currentMinute !== lastUpdatedMinute.current) {
            loadPredictionAll();
        }
    }, [time, loadPredictionAll]);

    // 의존성 변경 시 데이터 자동 로드
    useEffect(() => {
        loadPredictionAll();
    }, [loadPredictionAll])

    // 개별 배수지 수위 리스크 판별
    const checkLevelRisk = (res: ReservoirLevelType) => {
        const area = res.area || 500;
        const minLevel = res.minLevel || 0.5;
        const maxLevel = res.maxLevel || 6.0;

        // 예측 수요 데이터 없으면 1200 수요 있다고 가정
        const totalDemand = Number(predictions.filter(p => p.facilityId === res.facilityId).map(p => p.predictedValue)) || 0;

        // 현재 보유량 (부피)
        const currentVolume = res.level * area;

        // 상황 A: 저수위 위험 (현재 물이 나갈 물보다 적음)
        const isLowDanger = (currentVolume - totalDemand) < (minLevel * area);

        // 상황 B: 고수위 위험 (현재 수위 자체가 이미 한계치에 근접)
        const isHighDanger = res.level > maxLevel;

        return isLowDanger ? "low" : isHighDanger ? "high" : "normal";
    };

    return { isLoading, error, loadPredictionAll, checkLevelRisk, predictions };
}