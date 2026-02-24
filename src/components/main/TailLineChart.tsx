'use client'

import { useEffect, useState } from "react";
import { ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, Area } from "recharts";

interface TailChartProps {
    data: any[];
    labels: string[];
    mode?: "prediction" | "status"; 
}

export default function TailChart({ data, labels, mode = "status" }: TailChartProps) {
    const [hourStep, setHourStep] = useState(1);

    // 색상 정의
    const firstColor = mode === "prediction" ? "#3b82f6" : "#2563eb";  // 파랑 (실 수요/펌프)
    const secondColor = mode === "prediction" ? "#b699f7" :"#10b981"; // 초록 (예측 수요/수위)

    // 모드에 따른 단위 설정
    const units = mode === "prediction" ? [" m³/h", " m³/h"] : [" 대", " m"];

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
        <div className="w-full h-full flex flex-col gap-1">
            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: mode === "prediction" ? -30 : -20, left: -30, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d8dde3" />

                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 11 }}
                            interval={0}
                            label={{
                                value: "(시)",
                                position: "insideBottomRight",
                                offset: 0,
                                fill: "#94a3b8",
                                fontSize: 10
                            }}
                            tickFormatter={(value) => {
                                if (!value) return "";
                                if (value.includes(":")) {
                                    const [h, m] = value.split(":").map(Number);
                                    return m === 0 && h % hourStep === 0 ? `${h}` : "";
                                }
                                return value;
                            }}
                        />

                        <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: firstColor, fontSize: 10 }} domain={mode === "prediction" ? [0, "auto"] : [0, 4]} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: secondColor, fontSize: 10 }} domain={["auto", "auto"]} />

                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "none" }}
                            formatter={(value, name) => {
                                if (value === null || isNaN(Number(value))) return ["-", name];
                                const numValue = Number(value);
                                const unit = name === labels[0] ? units[0] : units[1];
                                return [`${numValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}${unit}`, name];
                            }}
                        />

                        {/* 첫 번째 데이터 라인 (실 수요 / 펌프) */}
                        <Line
                            yAxisId="left"
                            dataKey="first"
                            name={labels[0]}
                            stroke={firstColor}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />

                        {/* 두 번째 데이터 라인 (예측 수요 / 수위) */}
                        <Line
                            yAxisId={mode === "prediction" ? "left" : "right"}
                            dataKey="second"
                            name={labels[1]}
                            stroke={secondColor}
                            strokeWidth={2}
                            strokeDasharray={mode === "prediction" ? "5 5" : "0"}
                            dot={false}
                            isAnimationActive={false}
                        />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* 범례 영역 */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {labels.map((label, i) => (
                    <div key={i} className="flex items-center gap-2 group cursor-default">
                        <div className="w-2.5 h-3.5 rounded-xs" style={{ backgroundColor: i === 0 ? firstColor : secondColor, opacity: 0.8 }} />
                        <span className="text-[11px] text-slate-500">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}