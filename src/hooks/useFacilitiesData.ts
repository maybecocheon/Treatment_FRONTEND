'use client'

import { myFetch } from "@/api/api";
import { FACILITY_COORDS } from "@/data/mockData";
import { FacilityType } from "@/types/types";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

export function useFacilitiesData() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [facilities, setFacilities] = useState<FacilityType[]>([]);

    // 1. 데이터를 불러오는 함수
    const loadFacilities = useCallback(async () => {
        try {
            const response = await myFetch(`${baseUrl}/facility/all`);
            if (response.ok) {
                const data = await response.json();
                setFacilities(data);
            } else {
                toast.error("시설 불러오기 실패");
            }
        } catch (error) {
            console.error("시설 불러오기 오류", error);
            toast.error("시설 불러오기 오류");
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

    return { facilities: facilitiesWithCoords, loadFacilities };
}