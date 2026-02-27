'use client'

import { myFetch } from '@/api/api';
import { SimulationType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useRefreshTime } from './useRefreshTime';

export function useSimulation(pump: number) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { roundedTime: date } = useRefreshTime();

    const { data: simulation = [], isLoading, isFetching, error, refetch: loadSimulation } = useQuery<SimulationType[]>({
        queryKey: ["simulation", date, pump],

        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/reservoir/simulator/${pump}?date=${date}`);
            return data;
        },

        enabled: !!date && pump > 0,
        staleTime: 1000 * 60 * 15, // 15분
    });

    return {
        isLoading,
        isFetching,
        error,
        loadSimulation,
        simulation
    };
}