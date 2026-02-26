'use client'

import { useFacilities } from "@/hooks/useFacilities";
import { ChevronDown, Droplets } from "lucide-react";
import { useMemo } from "react";

interface FacilitySelectProps {
    value: number | undefined;
    onChange: (id: number) => void;
    placeholder?: string;
    filterTypes?: ("정수장" | "배수지")[];
}

export default function FacilitySelect({ value, onChange, placeholder = "시설 선택", filterTypes = ["배수지"] }: FacilitySelectProps) {
    const { facilities, isLoading } = useFacilities();

    // 필터링된 리스트를 메모이제이션하여 성능 최적화
    const filteredFacilities = useMemo(() => {
        if (!facilities) return [];
        return facilities.filter((f) => filterTypes.includes(f.type as "정수장" | "배수지"));
    }, [facilities, filterTypes]);

    return (
        <div className="relative flex-1">
            <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <select
                className="w-full bg-muted/10 border border-card-border rounded-2xl py-2.5 pl-11 pr-7 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none transition-colors"
                value={value || ""}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={isLoading}
            >
                {isLoading ? (
                    <option value="" disabled className="bg-card">로딩중...</option>
                ) : (
                    <option value="" disabled hidden className="bg-card">
                        {placeholder}
                    </option>
                )}
                {filteredFacilities && (
                    filteredFacilities.map((f) => (
                        <option key={f.facilityId} value={f.facilityId} className="bg-card">
                            {f.name}
                        </option>
                    ))
                )}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted group-hover:text-foreground transition-colors">
                <ChevronDown className="w-4 h-4" />
            </div>
        </div>
    );
}