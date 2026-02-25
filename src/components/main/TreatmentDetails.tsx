'use client'

import { mapDetailOpenAtom } from '@/atoms/uniAtoms';
import { useTreatment } from '@/hooks/useTreatment';
import { useAtomValue } from 'jotai';
import ErrorFallback from '../skeletons/ErrorFallback';
import { StatCard } from './StatCard';
import { Droplets, Gauge, Waves } from 'lucide-react';

export default function TreatmentDetails() {
    const mapOpenDetail = useAtomValue(mapDetailOpenAtom);
    const { treatment, loadTreatment, isLoading, error } = useTreatment();

    // 에러 발생 시 처리
    if (error) return (
        <div className="flex items-center justify-center h-screen w-full">
            <ErrorFallback error={error} onClick={() => loadTreatment()} />
        </div>
    );

    // 데이터가 로드되었지만 비어있는 경우
    if ((isLoading || !treatment) && mapOpenDetail) return null;

    return (
        <div className="flex flex-col gap-0 md:gap-4 p-6 h-full bg-sky-200/50">
            <StatCard
                icon={<Droplets size={28} />}
                label="실시간 송수량"
                value={treatment ? treatment.flowOutAmt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}
                unit="m³/h"
                colorClass="bg-blue-100/60 text-blue-700"
                loading={isLoading}
                error={error}
                onClick={loadTreatment}
            />
            <StatCard
                icon={<Gauge size={28} />}
                label="실시간 압력"
                value={treatment ? treatment.pressOutAvg.toFixed(2) : "---"}
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
    )
}
