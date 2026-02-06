'use client'

import { TailChartType } from '@/types/types';
import { useEffect, useMemo, useState } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function TailChart({
    time, data, data2, data3, data4,
    color = "#3b82f6", color2 = "#818cf8", color3 = "#10b981", color4 = "#10b981",
    label1, label2, label3, label4
}: TailChartType) {

    const chartData = useMemo(() => {
        if (!time || !data) return [];
        return data.map((val, i) => ({
            timeValue: time[i],
            demandNow: val,
            demandPredict: data2 ? data2[i] : null,
            levelNow: data3 ? data3[i] : null,
            levelPredict: data4 ? data4[i] : null,
        }));
    }, [data, data2, data3, data4]);

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
            <div className="w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%" minHeight="100px">
                    <AreaChart data={chartData} margin={{ top: 5, right: -20, left: -20, bottom: 0 }}>
                        <defs>
                            {/* 수위용 연한 그라데이션 */}
                            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color3} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color3} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="timeValue" hide={false} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} tickFormatter={(value) => {
                            if (!value) return "";

                            // 1. 시와 분 추출
                            const [hour, minute] = value.split(':').map(Number);

                            // 2. "00분"인 데이터 중에서만 검사
                            if (minute === 0) {
                                // 3. 현재 화면 크기에 따른 간격(hourStep)으로 나누어 떨어지는지 확인
                                if (hour % hourStep === 0) {
                                    return `${hour}시`;
                                }
                            }

                            return "";
                        }} />

                        {/* 왼쪽 Y축: 수요 (Demand) */}
                        <YAxis yAxisId="left" orientation="left" hide={false} axisLine={false} tickLine={false} tick={{ fill: color, fontSize: 10 }} />

                        {/* 오른쪽 Y축: 수위 (Level) */}
                        <YAxis yAxisId="right" orientation="right" hide={false} axisLine={false} tickLine={false} tick={{ fill: color3, fontSize: 10 }} domain={['auto', 'auto']} />

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <Tooltip
                            formatter={(value: number | undefined, name:string | undefined) => {
                                if (value === undefined || value === undefined) return ["-", name];

                                const numValue = Number(value);
                                const formattedValue = isNaN(numValue) ? value : numValue.toFixed(1);

                                let unit = "";
                                if (name?.includes("수요")) unit = " m³/h";
                                if (name?.includes("수위")) unit = " m";

                                return [`${formattedValue}${unit}`, name];
                            }} />

                        {/* 1. 수요 */}
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="demandNow"
                            stroke={color}
                            strokeWidth={2.5}
                            fill="transparent"
                            name={label1}
                            isAnimationActive={false}
                        />
                        {data2 && (
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="demandPredict"
                                stroke={color2}
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="transparent"
                                name={label2}
                                isAnimationActive={false}
                            />
                        )}

                        {/* 2. 수위 */}
                        {data3 && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="levelNow"
                                stroke={color3}
                                fill="url(#colorLevel)"
                                strokeWidth={1}
                                name={label3}
                                isAnimationActive={false}
                            />
                        )}
                        {data4 && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="levelPredict"
                                stroke={color4}
                                strokeDasharray="4 4"
                                fill="transparent"
                                strokeWidth={1}
                                name={label4}
                                isAnimationActive={false}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {
                (label1 || label2 || label3 || label4) && (
                    <div className="flex items-center justify-center gap-6">
                        {label1 && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1 rounded-full" style={{ backgroundColor: color }}></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{label1}</span>
                            </div>
                        )}
                        {label2 && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1 rounded-full bg-slate-300" style={{ backgroundColor: color2, borderStyle: "dashed", borderWidth: "1px" }}></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{label2}</span>
                            </div>
                        )}
                        {label3 && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1 rounded-full bg-slate-300" style={{ backgroundColor: color3 }}></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{label3}</span>
                            </div>
                        )}
                        {label4 && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1 rounded-full bg-slate-300" style={{ backgroundColor: color4, borderStyle: "dashed", borderWidth: "1px" }}></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{label4}</span>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    );
}