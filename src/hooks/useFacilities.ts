'use client'

import { myFetch } from "@/api/api";
import { FACILITY_COORDS } from "@/data/mockData";
import { FacilityType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useFacilities() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const { data: facilities = [], isLoading, error, refetch: loadFacilities, } = useQuery<FacilityType[]>({
        // 시설 정보는 시간이 바뀌어도 변하지 않는 데이터라서 고정 키
        queryKey: ["facilities"],

        queryFn: async () => {
            const data = await myFetch(`${baseUrl}/facility/all`);
            return data;
        },

        // 3. select: 가져온 데이터를 반환하기 전에 가공 (기존 useMemo 역할)
        select: (data) => {
            return data.map((facility) => {
                const coord = FACILITY_COORDS[String(facility.facilityId)];
                return {
                    ...facility,
                    lat: coord?.lat ?? 35.1795,
                    lng: coord?.lng ?? 129.0756,
                };
            });
        },

        // 시설 정보는 자주 바뀌지 않으므로 staleTime을 길게
        staleTime: 1000 * 60 * 60, // 1시간
    });

    return { facilities, loadFacilities, isLoading, error };
}