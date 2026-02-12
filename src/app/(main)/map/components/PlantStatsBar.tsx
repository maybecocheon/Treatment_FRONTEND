"use client"

import { StatCard } from "@/components/main/StatCard";
import { useTreatment } from "@/hooks/useTreatment";
import { Waves, Gauge, Droplets } from "lucide-react";
import { useEffect } from "react";

export default function PlantStatsBar() {
  const { treatment, loadTreatment, isLoading, error } = useTreatment();

  useEffect(() => {
    loadTreatment();
  }, [])

  return (
    <div className="flex flex-col gap-0 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full min-w-55">
      <StatCard
        icon={<Droplets size={28} />}
        label="정수장 송수량"
        value={treatment ? treatment.flowOutAmt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}
        unit="m³/h"
        colorClass="bg-blue-100/60 text-blue-700"
        loading={isLoading}
        error={error}
        onClick={loadTreatment}
      />
      <StatCard
        icon={<Gauge size={28} />}
        label="평균 압력"
        value={treatment ? treatment.pressOutAvg.toLocaleString() : "---"}
        unit="kgf/㎠"
        colorClass="bg-emerald-100/60 text-emerald-700"
        loading={isLoading}
        error={error}
        onClick={loadTreatment}
      />
      <StatCard
        icon={<Waves size={28} />}
        label="배수지 개수"
        value={treatment ? treatment.reservoirCnt : "---"}
        unit="개"
        colorClass="bg-indigo-100/60 text-indigo-700"
        loading={isLoading}
        error={error}
        onClick={loadTreatment}
      />
    </div>
  );
}