'use client'

import { DollarSign, Gauge, WavesIcon } from 'lucide-react';
import ChartBox from '@/components/main/ChartBox';
import { usePredictionData } from '@/hooks/usePredictionData';
import { useFacilities } from '@/hooks/useFacilities';
import { useEffect, useState } from 'react';
import TailChart from '@/components/main/TailAreaChart';
import TailCategory from '@/components/main/TailCategory';
import { selectedReservoirAtom } from '@/atoms/uniAtoms';
import { useAtomValue } from 'jotai';

export default function MainTrend() {
    const { filteredChartData, loadData } = usePredictionData();
    const { facilities, loadFacilities } = useFacilities();
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    useEffect(() => { loadFacilities(); }, [])

    useEffect(() => {
        const facilityId = facilities.find(f => f.facilityId === selectedReservoir?.facilityId)?.facilityId;
        if (facilityId) loadData(String(facilityId));
    }, [selectedReservoir, facilities]);

    return (
        <div className="h-full flex flex-col gap-4">
            {/* 카테고리 */}
            <div className="glass p-3 rounded-3xl">
                <TailCategory text="scheduling" />
            </div>

            {/* 메인 영역 */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* LEFT: 그래프 */}
                <div className="flex flex-col gap-4">
                    <ChartBox title={`${selectedReservoir?.name} 수요 및 수위 예측`} icon={WavesIcon}>
                        <TailChart
                            time={filteredChartData.map(d => d.time || 0)}
                            data={filteredChartData.map(d => d.actualValue || 0)}
                            data2={filteredChartData.map(d => d.predictedValue || 0)}
                            data3={[1, 2, 3, 4, 5, 6]}
                            data4={[6, 1, 2, 5, 4, 5]}
                            label1="현재 수요"
                            label2="수요 예측"
                            label3="현재 수위"
                            label4="수위 예측"
                        />
                    </ChartBox>

                    <ChartBox title="정수장 펌프 가동 스케줄링" icon={Gauge} color="text-green-700">
                        <TailChart
                            time={filteredChartData.map(d => d.time || 0)}
                            data={filteredChartData.map(d => d.actualValue || 0)}
                            data2={filteredChartData.map(d => d.predictedValue || 0)}
                            label1="현재 송수량"
                            label2="최적화 송수량"
                        />
                    </ChartBox>

                </div>


                {/* RIGHT: 에너지 비용 */}
                <div className="glass flex flex-col rounded-[2.5rem] p-6 shadow-lg gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 glass bg-white/60 rounded-xl text-amber-600">
                            <DollarSign size={18} />
                        </div>
                        <div>
                            <h4 className="text-base font-black text-blue-950 tracking-tight">
                                에너지 비용 최적화 리포트
                            </h4>
                            <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">
                                Cost Forecast
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4">
                        <div>
                            <p className="text-[10px] font-black text-emerald-950/40 uppercase">
                                예상 절감액
                            </p>
                            <p className="text-2xl font-black text-emerald-600 tracking-tight">
                                - ₩1.42M
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-black text-emerald-600 uppercase">
                                Saving Rate
                            </p>
                            <p className="text-xl font-black text-emerald-600">
                                18.5%
                            </p>
                        </div>
                    </div>

                    <div className="flex items-end justify-center gap-14 h-85 mt-4">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-lg font-bold text-slate-400">
                                ₩13.9M
                            </span>
                            <div className="relative w-20 h-65 bg-slate-100 rounded-3xl overflow-hidden">
                                <div className="absolute bottom-0 w-full h-full bg-slate-300" />
                            </div>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                                기존 비용
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xl font-black text-emerald-600">
                                ₩12.48M
                            </span>

                            <div className="relative w-20 h-65 bg-emerald-100 rounded-3xl overflow-hidden shadow-lg shadow-emerald-200">
                                <div className="absolute bottom-0 w-full h-[89.7%] bg-linear-to-t from-emerald-400 to-emerald-500 transition-all duration-700" />
                            </div>

                            <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
                                AI 최적화 비용
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="block lg:hidden border-sky-50" />
        </div>
    )
}
