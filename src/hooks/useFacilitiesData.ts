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
            const data = await response.json();
            if (response.ok) {
                setFacilities(data);
            } else {
                toast.error(data.message || "시설 불러오기 실패");
            }
        } catch (error) {
            console.error("시설 불러오기 오류", error);
            toast.error("시설 불러오기 오류");
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
    const getFilteredFacilities = useCallback((text = "basic") => {
        const filtered = facilitiesWithCoords.filter(f => f.type === "배수지" || f.type === "정수장");
        if (text.includes("history")) return [{facilityId: "overview", type: "overview", name: "전체"}, ...filtered];
        return filtered;
    }, [facilitiesWithCoords]);

    return { facilities: facilitiesWithCoords, getFilteredFacilities, loadFacilities };
}