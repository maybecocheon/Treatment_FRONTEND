import { KPIData } from '@/data/types';
import TailCard from './TailCard';

interface Props {
  data: KPIData;
}

export default function KPICardRow({ data }: Props) {
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
        value={`${data.flowRate.toLocaleString()}`}
        unit="m³/h"
        subLabel={`${data.flowChange > 0 ? '▲' : '▼'} ${Math.abs(data.flowChange)}%`}
        color="text-slate-900"
      />
      <TailCard
        label="평균 수위"
        value={`${data.avgLevel}`}
        unit="m"
        subLabel="모든 배수지"
        color="text-sky-600"
      />
      <TailCard
        label="최저 수위"
        value={`${data.minLevelValue}`}
        unit="m"
        subLabel={data.minLevelReservoir}
        color={data.minLevelValue < 25 ? 'text-rose-600' : 'text-amber-600'}
      />
      <TailCard
        label="최고 수위"
        value={`${data.maxLevelValue}`}
        unit="m"
        subLabel="안정 유지"
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
