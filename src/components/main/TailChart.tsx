'use client'

import { useEffect, useMemo, useState } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export interface TailChartProps {
    time: string[];
    data: number[];
    data2?: number[];
    color: string;
    color2?: string;
    label1?: string;
    label2?: string;
}

export default function TailChart({ time, data, data2, color, color2, label1, label2 }: TailChartProps) {
    // Recharts 형식에 맞게 데이터 변환 (24시간 기준)
    const chartData = useMemo(() => {
        if (!time || !data) return [];

        return data.map((val, i) => ({
            timeValue: time[i],
            value1: val,
            value2: data2 ? data2[i] : null,
        }));
    }, [data, data2]);

    // 화면 크기에 따른 X축 간격
    const [hourStep, setHourStep] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setHourStep(6);
            } else if (width < 1024) {
                setHourStep(3);
            } else {
                setHourStep(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="w-full h-60 lg:h-75 relative px-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            {/* 1. 첫 번째 데이터용 그라데이션: 위는 선 색상, 아래로 갈수록 투명하게 */}
                            <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.01} />
                            </linearGradient>

                            {/* 2. 두 번째 데이터용 그라데이션 */}
                            {color2 && (
                                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color2} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={color2} stopOpacity={0} />
                                </linearGradient>
                            )}
                        </defs>

                        {/* x축: 시간 표시 */}
                        <XAxis
                            dataKey="timeValue"
                            hide={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            interval={0}
                            tickFormatter={(value) => {
                                if (!value) return "";

                                // 1. "HH:mm"에서 시(HH)와 분(mm) 추출
                                const [hour, minute] = value.split(':').map(Number);

                                // 2. 오직 "00분"인 데이터 중에서만 검사
                                if (minute === 0) {
                                    // 3. 현재 화면 크기에 따른 간격(hourStep)으로 나누어 떨어지는지 확인
                                    if (hour % hourStep === 0) {
                                        return `${hour}시`;
                                    }
                                }

                                return "";
                            }}
                        />

                        {/* y축: 수치 표시 */}
                        <YAxis
                            hide={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            domain={['auto', 'auto']}
                        />

                        {/* 그리드 선도 아주 연하게 */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                        />

                        {/* fill에 위에서 만든 그라데이션 ID를 연결 */}
                        <Area
                            type="monotone"
                            dataKey="value1"
                            name="현재"
                            stroke={color}
                            strokeWidth={2.5}
                            fill={`url(#colorValue1)`}
                            fillOpacity={1}
                            isAnimationActive={false}
                        />

                        {data2 && (
                            <Area
                                type="monotone"
                                dataKey="value2"
                                name="수요"
                                stroke={color2}
                                strokeWidth={2}
                                strokeDasharray="5 5" // 예측치는 점선으로
                                fill="transparent"
                                isAnimationActive={false}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {
                (label1 || label2) && (
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
                )
            }
        </>
    );
};