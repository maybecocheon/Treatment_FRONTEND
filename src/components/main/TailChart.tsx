'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export interface TailChartProps {
    chartData: Array<{ time: string; actualValue: number | null; predictedValue: number }>;
}

export default function TailChart({ chartData }: TailChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    hide={false}
                    interval={0}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    /* 줌 상태에 따라 텍스트 포맷 조절 */
                    tickFormatter={(value) => value.includes(":00") ? value : ""}
                    padding={{ left: 30 }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />

                {/* 메인 선 */}
                <Line type="monotone" dataKey="predictedValue" name="예측" stroke="#10b981" strokeWidth={4} dot={false} />
                <Line type="monotone" dataKey="actualValue" name="실시간" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
