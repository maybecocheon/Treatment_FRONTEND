'use client'

import { KPIData } from '@/data/types';
import TailCard from './TailCard';
import { useTreatmentData } from '@/hooks/useTreatmentData';
import { useEffect } from 'react';
import { useReservoirLevel } from '@/hooks/useReservoirLevel';

interface Props {
  data: KPIData;
}

export default function KPICardRow({ data }: Props) {
  const { treatment, loadTreatment } = useTreatmentData();
  const { reservoirLevels, loadLevels } = useReservoirLevel();

  useEffect(() => {
    loadTreatment();
    loadLevels();
  }, [])

  // 데이터가 없을 때를 대비한 데이터 계산 로직
  const hasLevels = reservoirLevels && reservoirLevels.length > 0;
  
  const levelAvg = hasLevels 
    ? reservoirLevels.map(f => f.level).reduce((acc, cur) => acc + cur, 0) / reservoirLevels.length 
    : 0;

  const minFacility = hasLevels 
    ? reservoirLevels.reduce((min, cur) => (cur.level < min.level ? cur : min), reservoirLevels[0])
    : { reservoirName: '-', level: 0 };

  const maxFacility = hasLevels 
    ? reservoirLevels.reduce((max, cur) => (cur.level > max.level ? cur : max), reservoirLevels[0])
    : { reservoirName: '-', level: 0 };

  const getRiskColor = (score: number) => {
    if (score > 70) return 'text-rose-500';
    if (score > 40) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getPressureColor = (status: string) => {
    if (status === 'Danger') return 'text-rose-500';
    if (status === 'Partial Low') return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <TailCard
        label="송수량"
        value={treatment ? treatment.flowOutAmt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}
        unit="m³/h"
        subLabel="정수장"
        color="text-slate-900"
      />
      <TailCard
        label="평균 수위"
        value={hasLevels ? levelAvg.toFixed(2) : "---"}
        unit="m"
        subLabel="모든 배수지"
        color="text-sky-600"
      />
      <TailCard
        label="최저 수위"
        value={hasLevels ? minFacility.level.toFixed(2) : "---"}
        unit="m"
        subLabel={minFacility.reservoirName}
        color={data.minLevelValue < 25 ? 'text-rose-600' : 'text-amber-600'}
      />
      <TailCard
        label="최고 수위"
        value={hasLevels ? maxFacility.level.toFixed(2) : "---"}
        unit="m"
        subLabel={maxFacility.reservoirName}
        color="text-sky-600"
      />
      <TailCard
        label="평균 압력"
        value={data.pressureStatus === 'Normal' ? '정상' : '위험'}
        unit=""
        subLabel="실시간 모니터링"
        color={getPressureColor(data.pressureStatus)}
      />
      <TailCard
        label="공급 리스크"
        value={`${data.riskScore}`}
        unit="점"
        subLabel="위험도 지수"
        color={getRiskColor(data.riskScore)}
      />
    </div>
  );
};