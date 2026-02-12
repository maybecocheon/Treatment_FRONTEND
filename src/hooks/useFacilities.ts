'use client'

import { myFetch } from "@/api/api";
import { FACILITY_COORDS } from "@/data/mockData";
import { FacilityType } from "@/types/types";
import { useState, useCallback, useMemo } from "react";

export function useFacilities() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [facilities, setFacilities] = useState<FacilityType[]>([]);

    // 1. 데이터를 불러오는 함수
    const loadFacilities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await myFetch(`${baseUrl}/facility/all`);
            setFacilities(data);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl]);

    // 2. 불러온 시설 데이터에 좌표 더하기
    const facilitiesWithCoords = useMemo(() => {
        return facilities.map(facility => {
            const coord = FACILITY_COORDS[String(facility.facilityId)];
            return {
                ...facility,
                lat: coord?.lat ?? 35.1795,
                lng: coord?.lng ?? 129.0756
            };
        });
    }, [facilities]);

    return { facilities: facilitiesWithCoords, loadFacilities, isLoading, error };
}