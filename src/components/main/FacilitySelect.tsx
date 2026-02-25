'use client'

import { useFacilities } from "@/hooks/useFacilities";
import { Droplets } from "lucide-react";
import { useMemo } from "react";

interface FacilitySelectProps {
    value: number | undefined;
    onChange: (id: number) => void;
    placeholder?: string;
    filterTypes?: ("정수장" | "배수지")[];
}

export default function FacilitySelect({ value, onChange, placeholder = "로딩중...", filterTypes = ["배수지"]}: FacilitySelectProps) {
    const { facilities, isLoading } = useFacilities();

    // 필터링된 리스트를 메모이제이션하여 성능 최적화
    const filteredFacilities = useMemo(() => {
        if (!facilities) return [];
        return facilities.filter((f) => filterTypes.includes(f.type as "정수장" | "배수지"));
    }, [facilities, filterTypes]);

    return (
        <div className="relative flex-1">
            <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                value={value || ""}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {isLoading ? (
                    <option value="" disabled>{placeholder}</option>
                ) : (
                    filteredFacilities.map((f) => (
                        <option key={f.facilityId} value={f.facilityId}>
                            {f.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}