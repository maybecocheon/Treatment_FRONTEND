'use client'
import { LucideIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export interface ChartBoxProps {
    title: string;
    data: number[]; 
    data2?: number[];
    data3?: number[];
    color: string;
    color2?: string;
    label1?: string;
    label2?: string;
    label3?: string;
    icon: LucideIcon;
}

export default function ChartBox({ title, data, data2, data3, color, color2, label1, label2, label3, icon: Icon }: ChartBoxProps) {

    // Recharts 형식에 맞게 데이터 변환 (24시간 기준)
    const chartData = useMemo(() => {
        return data.map((val, i) => ({
            time: `${i}h`,
            value1: val,
            value2: data2 ? data2[i] : null,
            value3: data3 ? data3[i] : null,
        }));
    }, [data, data2, data3]);

    return (
        <div className="glass rounded-[2.5rem] p-6 flex flex-col gap-4 group transition-all duration-500 hover:shadow-md h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-200/50 text-blue-900/40 group-hover:text-blue-600 transition-colors">
                        <Icon size={16} />
                    </div>
                    <h5 className="text-[14px] font-semibold text-blue-950 uppercase tracking-tight">{title}</h5>
                    {title === "수요 (m³/h) & 수위" && <select
                        value={"배수지"}
                        // onChange={}
                        className="bg-slate-50 border border-slate-200 text-[10px] lg:text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-bold"
                    >
                        <option>A 배수지</option>
                        {/* {facilities.filter(f => f.type === "배수지").map(f => <option key={f.facilityId} value={f.name}>{f.name}</option>)} */}
                    </select>}
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

                        {data3 && (
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
            {(label1 || label2 || label3) && (
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
                    {label3 && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-1 rounded-full bg-slate-300" style={{ backgroundColor: color2, borderStyle: 'dashed', borderWidth: '1px' }}></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{label3}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};