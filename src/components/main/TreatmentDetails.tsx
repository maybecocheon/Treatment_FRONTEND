'use client'

import { useTreatment } from "@/hooks/useTreatment";
import ErrorFallback from "../fallback/ErrorFallback";
import { StatCard } from "./StatCard";
import { Droplets, Gauge, Waves } from "lucide-react";
import StatCardSkeleton from "./skeletons/StatCardSkeleton";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";

export default function TreatmentDetails() {
    const mapUI = useMapUI();
    const isModalOpen = mapUI?.isModalOpen;

    const { treatment, loadTreatment, isLoading, error } = useTreatment();

    return (
        <div className={`p-6 h-full bg-info-bg overflow-y-auto ${isModalOpen ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-3"}`}>
            {
                isLoading ?
                    Array.from({ length: 3 }).map((_, idx) => (
                        <StatCardSkeleton key={idx} />
                    ))
                    :
                    error ?
                        <ErrorFallback error={error} onClick={() => loadTreatment()} />
                        :
                        <>
                            <StatCard
                                icon={<Droplets size={28} />}
                                label="실시간 송수량"
                                value={treatment ? treatment.flowOutAmt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}
                                unit="m³/h"
                                colorClass="bg-info-bg text-info"
                            />
                            <StatCard
                                icon={<Gauge size={28} />}
                                label="실시간 압력"
                                value={treatment ? treatment.pressOutAvg.toFixed(2) : "---"}
                                unit="kgf/㎠"
                                colorClass="bg-success-bg text-success"
                            />
                            <StatCard
                                icon={<Waves size={28} />}
                                label="배수지 개수"
                                value={treatment ? treatment.reservoirCnt : "---"}
                                unit="개"
                                colorClass="bg-info-bg text-info"
                            />
                        </>
            }
        </div>
    )
}
