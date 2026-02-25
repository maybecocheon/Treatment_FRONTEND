'use client'

import { useEffect, useMemo, useState } from "react";
import { ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, Area } from "recharts";

interface PredictionChartProps {
    data: any[];
    labels: string[];
    mode?: "prediction" | "status";
    second?: boolean;
    first?: boolean;
}

export default function PredictionChart({ data, labels, mode = "status", second = true, first = true }: PredictionChartProps) {
    const [hourStep, setHourStep] = useState(1);

    // 색상 정의
    const waterLevelColor = "#7BC9FF"; // 수위 
    const demandColor = "#6495ED";     // 수요 

    const pumpStroke = "#52C498";      // 펌프 테두리 
    const pumpFill = "#A7F3D0";        // 펌프 면적
    const predictLineColor = "#8ebdde"; // 예측 수요 점선

    // 현재 모드에 따른 메인 컬러 선택
    const mainColor = mode === "status" ? waterLevelColor : demandColor;
    const subColor = mode === "status" ? pumpStroke : predictLineColor;

    // 모드에 따른 단위 설정
    const units = mode === "prediction" ? [" m³/h", " m³/h"] : [" m", " 대"];

    // 범례 색상 가이드
    const legendItems = useMemo(() => {
        const items = [];
        if (first) items.push({ label: labels[0], color: mainColor });
        if (second) items.push({ label: labels[1], color: subColor });
        return items;
    }, [first, second, labels, mainColor, subColor]);

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
                    <ComposedChart data={data} margin={{ top: 10, right: mode === "prediction" ? -30 : -20, left: -30, bottom: 5 }}>
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

                        <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: mainColor, fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                            tick={{ fill: subColor, fontSize: 10 }} domain={mode === "prediction" ? ["auto", "auto"] : [0, 4]} />

                        <Tooltip
                            cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                            contentStyle={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "10px",
                                fontSize: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                            }}
                            formatter={(value, name) => {
                                if (value === null || isNaN(Number(value))) return ["-", name];
                                const numValue = Number(value);
                                const unit = name === labels[0] ? units[0] : units[1];
                                return [`${numValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}${unit}`, name];
                            }}
                        />

                        {/* 가동 펌프 */}
                        {second && mode === "status" && (
                            <Area
                                yAxisId="right"
                                type="stepAfter"    // 계단식
                                dataKey="second"
                                name={labels[1]}
                                stroke={pumpStroke}
                                fill={pumpFill}
                                fillOpacity={0.3}
                                strokeWidth={1.5}
                                isAnimationActive={false}
                            />
                        )}

                        {/* 예측 수요 */}
                        {second && mode === "prediction" && (
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="second"
                                name={labels[1]}
                                stroke={predictLineColor}
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                isAnimationActive={false}
                            />
                        )}

                        {/* 실 수요 / 수위 */}
                        {first && (
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="first"
                                name={labels[0]}
                                stroke={mainColor}
                                strokeWidth={2.5}
                                dot={false}
                                isAnimationActive={false}
                                connectNulls
                            />
                        )}

                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* 범례 영역 */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
                {legendItems.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
                        {legendItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 group cursor-default">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-[11px] font-medium text-slate-500">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}