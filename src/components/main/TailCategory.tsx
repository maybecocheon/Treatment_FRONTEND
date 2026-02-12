'use client'

import { selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useFacilities } from "@/hooks/useFacilities";
import { useAtom } from "jotai";
import { Droplets, Factory } from "lucide-react";
import { useEffect } from "react";

export default function TailCategory({ text }: { text: string }) {
    const [selectedReservoir, setSelectedReservoir] = useAtom(selectedReservoirAtom);
    const { loadFacilities, facilities } = useFacilities();

    useEffect(() => {
        loadFacilities();
        return () => setSelectedReservoir(null);
    }, []);

    const filteredData =
        text === "scheduling"
            ? facilities.filter(f => f.type === "배수지")
            : facilities.filter(f => f.type === "정수장" || f.type === "배수지");

    return (
        <div className="flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
            {filteredData.map((f) => {
                const isSelected = selectedReservoir?.facilityId === f.facilityId;
                return (
                    <button
                        key={f.facilityId}
                        onClick={() => setSelectedReservoir(f)}
                        className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-xl
                                text-sm font-semibold whitespace-nowrap
                                transition-all duration-200

                                ${isSelected ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-white/60"}
                            `}>
                        {f.type === "정수장" && <Factory className="w-4 h-4" />}
                        {f.type === "배수지" && <Droplets className="w-4 h-4" />}
                        {f.name}
                    </button>
                );
            })}
        </div>
    );
}
