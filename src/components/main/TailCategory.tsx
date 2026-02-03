'use client'

import { fetchFacilityAll } from "@/fetchs/fetchFacilityAll";
import { Database, Droplets, Factory } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Facility {
    facilityId: number | string;
    name: string;
    type: string;
}

export default function TailCategory({ text, params }: { text: string, params: string }) {
    const router = useRouter();
    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        fetchFacilityAll({ setFacilities });
    }, []);

    // 데이터 필터링
    const getFilteredData = () => {
        if (!facilities) return [];

        const base = facilities.filter(f => f.type === "배수지" || f.type === "정수장");

        // scheduling이 아닐 때 "전체" 추가 (push 대신 스프레드 연산자 사용)
        if (text !== "scheduling") {
            return [
                { facilityId: "overview", name: "전체", type: "overview" }, 
                ...base
            ];
        }
        return base;
    };

    const filteredData = getFilteredData();

    return (
        <div className="glass p-4 rounded-3xl flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar w-full">
                {filteredData.map((facility) => (
                    <button
                        key={facility.facilityId}
                        onClick={() => {
                            router.push(`/${text}/${facility.facilityId}`);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                            String(params) === String(facility.facilityId)
                                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {facility.type === "overview" && <Database className="w-4 h-4" />}
                        {facility.type === "정수장" && <Factory className="w-4 h-4" />}
                        {facility.type === "배수지" && <Droplets className="w-4 h-4" />}
                        {facility.name}
                    </button>
                ))}
            </div>
        </div>
    );
}