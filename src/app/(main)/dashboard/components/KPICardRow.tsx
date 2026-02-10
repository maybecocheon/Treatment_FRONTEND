'use client'

import TailCard from './TailCard';
import { useTreatmentData } from '@/hooks/useTreatmentData';
import { useEffect, useState } from 'react';
import { useReservoirLevel } from '@/hooks/useReservoirLevel';

export default function KPICardRow() {
  const { treatment, loadTreatment } = useTreatmentData();
  const { reservoirLevels, loadLevels } = useReservoirLevel();

  useEffect(() => {
    loadTreatment();
    loadLevels();
  }, [])

  // 데이터가 없을 때를 대비한 정수장, 배수지 계산 로직
  const hasLevels = reservoirLevels && reservoirLevels.length > 0;

  const levelAvg = hasLevels
    ? reservoirLevels.map(f => f.level).reduce((acc, cur) => acc + cur, 0) / reservoirLevels.length
    : 0;

  const minFacility = hasLevels
    ? reservoirLevels.reduce((min, cur) => (cur.level < min.level ? cur : min), reservoirLevels[0])
    : { reservoirName: "-", level: 0 };

  const maxFacility = hasLevels
    ? reservoirLevels.reduce((max, cur) => (cur.level > max.level ? cur : max), reservoirLevels[0])
    : { reservoirName: "-", level: 0 };


    
    const [loading, setLoading] = useState(true);
    
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        // 3초 동안 스켈레톤을 보여주기 위해 의도적 지연
        delay(3000).then(() => setLoading(false));
    }, []);
    
    if (loading) {
        // Suspense를 트리거하기 위해 로딩 중엔 null을 던지거나 
        // 혹은 직접 스켈레톤을 리턴해도 되지만, 테스트를 위해 에러를 던지지 않고 
        // 컴포넌트 자체가 '지연'되는 상황을 만들려면 서버 컴포넌트 방식이 가장 좋습니다.
        throw delay(3000); // React 18+ 내부 실험적 방식 (Suspense 트리거)
    }

  return (
    <div className="shrink-0">
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
          color="text-rose-600"
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
          value="위험"
          unit=""
          subLabel="실시간 모니터링"
          color="text-rose-600"
        />
        <TailCard
          label="공급 리스크"
          value="79"
          unit="점"
          subLabel="위험도 지수"
          color="text-rose-600"
        />
      </div>
    </div>
  );
};