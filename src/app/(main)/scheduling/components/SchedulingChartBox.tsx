'use client'

import { useFacilitiesData } from '@/hooks/useFacilitiesData';
import { useEffect, useMemo, useState } from 'react'
import PredictionChart from '../../../../components/main/TailChart';
import { ChartBoxType, FacilityType } from '@/types/types';

export default function SchedulingChartBox({ title, time, data, data2, color, color2, label1, label2, icon: Icon, loadData }: ChartBoxType) {
    const { getFilteredFacilities, loadFacilities } = useFacilitiesData();
    const [selectedId, setSelectedId] = useState<FacilityType["facilityId"]>("4");

    const reservoir = useMemo(() =>
        getFilteredFacilities().filter(f => f.type === "배수지"),
        [getFilteredFacilities]
    );

    useEffect(() => {
        loadFacilities();
    }, [])

    useEffect(() => {
        if (selectedId !== undefined) {
            loadData?.(selectedId);
        }
    }, [selectedId]);

    return (
        <div className="glass rounded-[2.5rem] p-6 flex flex-col gap-4 group transition-all duration-500 hover:shadow-md h-full">
            <div className="flex flex-col gap-4 justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-200/50 text-blue-900/40 group-hover:text-blue-600 transition-colors">
                        <Icon size={16} />
                    </div>
                    <h5 className="text-[14px] font-semibold text-blue-950 uppercase tracking-tight">{title}</h5>
                    {title === "수요 (m³/h)" &&
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-[10px] lg:text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-bold"
                        >
                            {reservoir.map(facility => <option key={facility.facilityId} value={facility.facilityId}>{facility.name}</option>)}
                        </select>}
                </div>
                <PredictionChart
                    time={time}
                    data={data}
                    data2={data2}
                    color={color}
                    color2={color2}
                    label1={label1}
                    label2={label2}
                 />
            </div>
        </div>
    )
}
