'use client'

import React, { useEffect, useMemo } from 'react';
import Title from '@/components/main/Title';
import { Activity, DollarSign, Clock, Cpu, BarChart3, Waves, Droplets, Gauge } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Category from '@/components/main/TailCategory';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedCategoryAtom } from '@/atoms/uniAtoms';

const PumpSchedulingPage: React.FC = () => {
    const selectedCategory = useAtomValue(selectedCategoryAtom);
    const setSeletedCategory = useSetAtom(selectedCategoryAtom);

    const generateTrend = (base: number, variance: number, points: number = 24) =>
        Array.from({ length: points }, () => base + (Math.random() - 0.5) * variance);

    const trends = useMemo(() => ({
        outflow: generateTrend(12000, 2000),
        storage: generateTrend(75, 15),
        pumpRate: generateTrend(60, 40),
        demand: generateTrend(150, 40),
        prediction: generateTrend(155, 30),
        level: generateTrend(65, 20)
    }), [selectedCategory]);

    useEffect(() => {
        setSeletedCategory("OVERVIEW");
    }, []);

    return (
        <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
            <Title title="지능형 펌프 운영 스케줄링" subtitle="AI 기반 펌프 운영 및 전기 요금 최적화 분석" />

            <div className="flex-1 flex flex-col gap-6">
                {/* 1. 에너지 비용 & 최적화 가이드 섹션 */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                    {/* 가이드 메시지 패널 */}
                    <div className="xl:col-span-4 glass rounded-[2.5rem] p-6 border border-white/60 shadow-lg relative overflow-hidden group flex flex-col justify-center">
                        <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 rotate-12">
                            <Cpu size={120} className="text-blue-900" />
                        </div>
                        <div className="flex items-center gap-3 mb-4 relative">
                            <div className="p-2 glass bg-blue-100/60 rounded-xl text-blue-700">
                                <Clock size={18} />
                            </div>
                            <div>
                                <h4 className="text-base font-black text-blue-950 tracking-tight">지능형 가동 가이드</h4>
                                <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">AI Analysis</p>
                            </div>
                        </div>
                        <div className="relative space-y-3">
                            <div className="p-4 rounded-3xl bg-emerald-50/40 border border-emerald-100/50 flex gap-4 backdrop-blur-md">
                                <div className="w-1 bg-emerald-400 rounded-full"></div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-emerald-950">
                                        <span className="text-blue-600 font-black">02:00 ~ 05:00</span> 집중 가동 권장
                                    </p>
                                    <p className="text-[11px] font-medium text-emerald-900/60 leading-tight">
                                        야간 경부하 요금을 활용해 에너지를 최적화하세요.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 통합 비용 분석 패널 */}
                    <div className="xl:col-span-8 glass rounded-[2.5rem] p-6 border border-white/60 shadow-lg flex flex-col md:flex-row gap-6 items-center">
                        {/* 타이틀 영역 */}
                        <div className="flex flex-row md:flex-col gap-3 min-w-45">
                            <div className="p-2 w-fit glass bg-white/60 rounded-xl text-amber-600 shadow-sm">
                                <DollarSign size={18} />
                            </div>
                            <div>
                                <h4 className="text-base font-black text-blue-950 tracking-tight">에너지 비용 최적화 리포트</h4>
                                <p className="text-[9px] font-bold text-blue-900/30 uppercase tracking-widest">Cost Forecast</p>
                            </div>
                        </div>

                        {/* 바 그래프 영역 */}
                        <div className="flex-1 w-full space-y-4 px-2">
                            <div className="space-y-1">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-[10px] font-bold text-blue-900/40">현재 비용</span>
                                    <span className="text-xs font-bold text-blue-950">₩13.9M</span>
                                </div>
                                <div className="h-2 w-full bg-blue-900/5 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-blue-900/20" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-[10px] font-bold text-emerald-600">최적화 후 비용 (AI)</span>
                                    <span className="text-sm font-black text-emerald-600">₩12.48M</span>
                                </div>
                                <div className="h-3 w-full bg-emerald-900/5 rounded-full overflow-hidden border border-emerald-100/30">
                                    <div className="h-full w-[81%] bg-linear-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                                </div>
                            </div>
                        </div>

                        {/* 절감 수치 영역 */}
                        <div className="flex flex-row md:flex-col gap-4 md:gap-1 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 min-w-40">
                            <div>
                                <p className="text-[9px] font-black text-emerald-900/40 uppercase">예상 절감액</p>
                                <p className="text-xl font-black text-emerald-600 tracking-tighter">- ₩1.42M</p>
                            </div>
                            <div className="md:pt-1 md:border-t md:border-emerald-500/10">
                                <p className="text-[9px] font-black text-emerald-600 uppercase">Saving Rate <span className="text-lg ml-1 font-black">18.5%</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. 메인 분석 대시보드 - Charts (Wide Layout) */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                            <Activity className="text-blue-600" size={24} />
                            {selectedCategory} 운영 트렌드 (24h)
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {selectedCategory === "PLANT" ? (
                            <ChartBox title="송수량 변동 추이 (m³/h)" data={trends.outflow} color="#3b82f6" icon={<Droplets size={16} />} />
                        ) : (
                            <ChartBox
                                title="수요량 및 예측 (m³/h)"
                                data={trends.demand}
                                data2={trends.prediction}
                                color="#3b82f6"
                                color2="#818cf8"
                                label1="현재 실측치"
                                label2="AI 예측치"
                                icon={<BarChart3 size={16} />}
                            />
                        )}

                        {selectedCategory === "PLANT" ? (
                            <ChartBox
                                title="잔량 및 펌프 가동률 통합"
                                data={trends.storage}
                                data2={trends.pumpRate}
                                color="#818cf8"
                                color2="#10b981"
                                label1="정수장 잔량 (%)"
                                label2="펌프 가동률 (%)"
                                icon={<Gauge size={16} />}
                            />
                        ) : (
                            <ChartBox
                                title="수위 및 펌프 가동률 통합"
                                data={trends.level}
                                data2={trends.pumpRate}
                                color="#0ea5e9"
                                color2="#10b981"
                                label1="배수지 수위 (%)"
                                label2="가동 펌프률 (%)"
                                icon={<Waves size={16} />}
                            />
                        )}
                    </div>
                </div>

                {/* 3. 시설 선택 카테고리 (Moved to Bottom) */}
                <div className="flex-col gap-3 mt-4">
                    <Category />
                </div>
            </div>
        </div>
    );
};



const ChartBox: React.FC<{
    title: string;
    data: number[];
    data2?: number[];
    color: string;
    color2?: string;
    label1?: string;
    label2?: string;
    icon: React.ReactNode
}> = ({ title, data, data2, color, color2, label1, label2, icon }) => {

    // Recharts 형식에 맞게 데이터 변환 (24시간 기준)
    const chartData = useMemo(() => {
        return data.map((val, i) => ({
            time: `${i}h`,
            value1: val,
            value2: data2 ? data2[i] : null,
        }));
    }, [data, data2]);

    return (
        <div className="glass rounded-[2.5rem] p-6 flex flex-col gap-4 group transition-all duration-500 hover:shadow-md h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-200/50 text-blue-900/40 group-hover:text-blue-600 transition-colors">
                        {React.cloneElement(icon as React.ReactElement)}
                    </div>
                    <h5 className="text-[14px] font-semibold text-blue-950 uppercase tracking-tight">{title}</h5>
                </div>
            </div>

            <div className="w-full h-52 relative px-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            {/* 1. 첫 번째 데이터용 그라데이션: 위는 선 색상, 아래로 갈수록 투명하게 */}
                            <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.01} />
                            </linearGradient>

                            {/* 2. 두 번째 데이터용 그라데이션 (선택 사항) */}
                            {color2 && (
                                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color2} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={color2} stopOpacity={0} />
                                </linearGradient>
                            )}
                        </defs>

                        {/* x축: 시간 표시 */}
                        <XAxis
                            dataKey="time"
                            hide={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            interval={5} // 6시간 간격으로 표시 (0, 6, 12, 18...)
                            unit="h"
                        />

                        {/* y축: 수치 표시 */}
                        <YAxis
                            hide={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            // 0부터 최대값까지 적절히 배분
                            domain={['auto', 'auto']}
                        />

                        {/* 그리드 선도 아주 연하게 (얌전하게) */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                        />

                        {/* 실제 Area: fill에 위에서 만든 그라데이션 ID를 연결 */}
                        <Area
                            type="monotone"
                            dataKey="value1"
                            stroke={color}
                            strokeWidth={2.5}
                            fill={`url(#colorValue1)`} // 검정색 대신 그라데이션 사용
                            fillOpacity={1} // opacity는 그라데이션 내부 stopOpacity에서 조절됨
                        />

                        {data2 && (
                            <Area
                                type="monotone"
                                dataKey="value2"
                                stroke={color2}
                                strokeWidth={2}
                                strokeDasharray="5 5" // 예측치는 점선으로 얌전하게
                                fill="transparent"    // 두 번째 데이터는 채우기 없이 선만 남기면 더 깔끔함
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* 범례 영역 */}
            {(label1 || label2) && (
                <div className="flex items-center justify-center gap-6">
                    {label1 && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-1 rounded-full" style={{ backgroundColor: color }}></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{label1}</span>
                        </div>
                    )}
                    {label2 && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-1 rounded-full bg-slate-300" style={{ backgroundColor: color2, borderStyle: 'dashed', borderWidth: '1px' }}></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{label2}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PumpSchedulingPage;