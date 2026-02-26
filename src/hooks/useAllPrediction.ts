'use client'

import { myFetch } from '@/api/api';
import { ReservoirLevelType, PredictionAllType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useRefreshTime } from './useRefreshTime';
import { useCallback } from 'react';

export function useAllPrediction() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { displayTime: date } = useRefreshTime();

    // 메인 쿼리 로직
    const { data: predictions = [], isLoading, isFetching, error, refetch: loadPredictionAll } = useQuery<PredictionAllType[]>({
        queryKey: ["allPredictions", date],

        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/reservoir/predict?date=${date}`);

            if (data.isProcessing) {
                throw new Error("PROCESSING"); // React Query의 retry를 발동시킴
            }
            return data;
        },

        enabled: !!date,
        staleTime: 1000 * 60 * 15, // 15분

        // 재시도 전략: 서버가 계산 중일 때 2초 간격으로 최대 5번
        retry: (failureCount, error: any) => {
            if (error.message === "PROCESSING" && failureCount < 5) return true;
            return false;
        },
        retryDelay: 2000,
    });

    // 비즈니스 로직: 리스크 판별
    const checkLevelRisk = useCallback((res: ReservoirLevelType) => {
        // 1. 기본값 세팅
        const area = res.area || 500;
        const minLevel = res.minLevel || 0.5;
        const maxLevel = res.maxLevel || 6.0;

        // 2. 예측 데이터 가져오기 (유입/유출)
        const facilityData = predictions.find((p: any) => p.facilityId === res.facilityId);
        const flowIn = facilityData?.flowInAmt || 0;
        const flowOut = facilityData?.flowOutAmt || 0;

        // 3. 핵심 계산: 예상 부피
        // 공식: (현재 수위 * 면적) + 유입량 - 유출량
        const currentVolume = res.level * area;
        const estimatedVolume = currentVolume + flowIn - flowOut;
        const estimatedLevel = estimatedVolume / area;

        // 4. 위험도 판별
        // 저수위 위험: 예상 수위가 최소 기준보다 낮아질 때
        const isLowDanger = estimatedLevel < minLevel;

        // 고수위 위험: 현재 수위 혹은 예상 수위가 최대치를 넘을 때 (보수적 판단)
        const isHighDanger = estimatedLevel > maxLevel || res.level > maxLevel;

        if (isLowDanger) return "low";
        if (isHighDanger) return "high";
        return "normal";
    }, [predictions]);

    return {
        isLoading: isLoading || (isFetching && !predictions),
        error,
        loadPredictionAll,
        checkLevelRisk,
        predictions
    };
}