'use client'

import { FACILITY_COORDS } from "@/data/mockData";
import { useState, useCallback, useMemo } from "react";

export interface FacilityType {
    facilityId: number | string;
    name: string;
    type: string;
    lat?: number; 
    lng?: number;
}

export function useFacilitiesData() {
    const [facilities, setFacilities] = useState<FacilityType[]>([]);

    // 1. 데이터를 불러오는 함수
    const loadFacilities = useCallback(async () => {
        try {
            const response = await fetch("/api/proxy/facility/all");
            const data = await response.json();
            setFacilities(data);
        } catch (error) {
            console.error("시설 불러오기 실패", error);
        }
    }, []);

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

    // 3. 필터링 로직을 수행
    const getFilteredFacilities = useCallback((mode: string = "basic") => {
        const base = facilitiesWithCoords.filter(f => f.type === "배수지" || f.type === "정수장");

        if (mode !== "scheduling") {
            return [
                { facilityId: "overview", name: "전체", type: "overview" },
                ...base
            ];
        }
        return base;
    }, [facilitiesWithCoords]);

    return { facilities: facilitiesWithCoords, getFilteredFacilities, loadFacilities };
}