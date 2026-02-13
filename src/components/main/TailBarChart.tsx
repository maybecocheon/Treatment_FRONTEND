'use client'

import { TailChartType } from '@/types/types';
import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function TailBarChart({
    time, data1, data2, data3, data4,
    labels = [],
    colors = ["#3b82f6", "#818cf8", "#36bad1", "#f59e0b"],
    units = ["", "", "", ""],
}: TailChartType) {

    const chartData = useMemo(() => {
        if (!time) return [];
        return time.map((t, i) => ({
            timeValue: t,
            v1: data1 ? data1[i] : null,
            v2: data2 ? data2[i] : null,
            v3: data3 ? data3[i] : null,
            v4: data4 ? data4[i] : null,
        }));
    }, [time, data1, data2, data3, data4]);

    const [hourStep, setHourStep] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setHourStep(6);
            else if (width < 1024) setHourStep(3);
            else setHourStep(1);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%" minHeight={100}>
                    <BarChart 
                        data={chartData} 
                        margin={{ top: 10, right: -10, left: -10, bottom: 0 }}
                        barGap={4}
                    >
                        <XAxis
                            dataKey="timeValue"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 11 }}
                            interval={0}
                            tickFormatter={(value) => {
                                if (!value || !value.includes(":")) return value;
                                const [h, m] = value.split(":").map(Number);
                                return m === 0 && h % hourStep === 0 ? `${h}` : "";
                            }}
                        />

                        <YAxis yAxisId="left" orientation="left" hide={false} axisLine={false} tickLine={false} tick={{ fill: colors[0], fontSize: 10 }} domain={["auto", "auto"]} />
                        <YAxis yAxisId="right" orientation="right" hide={!data3} axisLine={false} tickLine={false} tick={{ fill: colors[2], fontSize: 10 }} domain={["auto", "auto"]} />

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            formatter={(value, name, _, index) => {
                                const numValue = Number(value);
                                const unit = units[index] || "";
                                return [
                                    isNaN(numValue) ? "---" : `${numValue.toFixed(2)}${unit}`,
                                    name as string];
                            }}
                        />

                        {/* 바 데이터 구성 */}
                        {data1 && (
                            <Bar
                                yAxisId="left"
                                dataKey="v1"
                                fill={colors[0]}
                                radius={[4, 4, 0, 0]}
                                barSize={8}
                                name={labels[0]}
                            />
                        )}
                        {data2 && (
                            <Bar
                                yAxisId="left"
                                dataKey="v2"
                                fill={colors[1]}
                                radius={[4, 4, 0, 0]}
                                barSize={8}
                                name={labels[1]}
                            />
                        )}
                        {data3 && (
                            <Bar
                                yAxisId="right"
                                dataKey="v3"
                                fill={colors[2]}
                                radius={[4, 4, 0, 0]}
                                barSize={8}
                                name={labels[2]}
                            />
                        )}
                        {data4 && (
                            <Bar
                                yAxisId="right"
                                dataKey="v4"
                                fill={colors[3]}
                                radius={[4, 4, 0, 0]}
                                barSize={8}
                                name={labels[3]}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 범례 영역 */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {labels.map((label, i) => {
                    if (!label) return null;
                    return (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i] }} />
                            <span className="text-[11px] font-bold text-slate-500 uppercase">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}