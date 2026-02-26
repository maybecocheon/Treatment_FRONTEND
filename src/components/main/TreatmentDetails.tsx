'use client'

import { useTreatment } from '@/hooks/useTreatment';
import ErrorFallback from '../skeletons/ErrorFallback';
import { StatCard } from './StatCard';
import { Droplets, Gauge, Waves } from 'lucide-react';
import { useMapUI } from '@/app/(main)/map/components/MapUIContext';
import TreatmentDetailsSkeleton from './skeletons/TreatmentDetailsSkeleton';

interface TreatmentDetailsProps {
    mapDetailOpen?: boolean;
}

export default function TreatmentDetails({ mapDetailOpen: propMapDetailOpen }: TreatmentDetailsProps) {
    const mapUI = useMapUI();
    const mapOpenDetail = propMapDetailOpen ?? mapUI?.mapDetailOpen;
    const { treatment, loadTreatment, isLoading, error } = useTreatment();

    // 에러 발생 시 처리
    if (error) return (
        <div className="flex items-center justify-center h-screen w-full">
            <ErrorFallback error={error} onClick={() => loadTreatment()} />
        </div>
    );

    // 로딩 중이거나 데이터가 없을 때
    if (isLoading || !treatment) {
        if (mapOpenDetail) return <TreatmentDetailsSkeleton />;
        return null;
    }

    return (
        <div className="flex flex-col gap-0 md:gap-4 p-6 h-full bg-info-bg">
            <StatCard
                icon={<Droplets size={28} />}
                label="실시간 송수량"
                value={treatment ? treatment.flowOutAmt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}
                unit="m³/h"
                colorClass="bg-info-bg text-info"
                loading={isLoading}
                error={error}
                onClick={loadTreatment}
            />
            <StatCard
                icon={<Gauge size={28} />}
                label="실시간 압력"
                value={treatment ? treatment.pressOutAvg.toFixed(2) : "---"}
                unit="kgf/㎠"
                colorClass="bg-success-bg text-success"
                loading={isLoading}
                error={error}
                onClick={loadTreatment}
            />
            <StatCard
                icon={<Waves size={28} />}
                label="배수지 개수"
                value={treatment ? treatment.reservoirCnt : "---"}
                unit="개"
                colorClass="bg-info-bg text-info"
                loading={isLoading}
                error={error}
                onClick={loadTreatment}
            />
        </div>
    )
}
