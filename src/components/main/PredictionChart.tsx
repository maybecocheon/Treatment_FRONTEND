'use client'

import { useEffect, useMemo, useState } from "react";
import { ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, Area } from "recharts";
import { useTheme } from "next-themes";

interface PredictionChartProps {
    data: any[];
    labels: string[];
    mode?: "prediction" | "optimization";
    second?: boolean;
    first?: boolean;
}

export default function PredictionChart({ data, labels, mode = "optimization", second = true, first = true }: PredictionChartProps) {
    const { theme } = useTheme();
    const [hourStep, setHourStep] = useState(1);
    const isDark = theme === "dark";

    // 색상 정의
    const waterLevelColor = isDark ? "#22d3ee" : "#0ea5e9"; // 수위 (Cyan Blue)
    const demandColor = isDark ? "#818cf8" : "#2563eb";     // 실제 수요 / 실제 수위 (Indigo Blue)

    const pumpStroke = isDark ? "#10b981" : "#059669";      // 펌프 테두리 (Green)
    const pumpFill = isDark ? "#10b98133" : "#05966933";    // 펌프 면적 (Green opacity)
    const predictLineColor = isDark ? "#c7d2fe" : "#60a5fa"; // 예측 수요 / 예측 수위 (Light Indigo in Dark)

    // 현재 모드에 따른 메인 컬러 선택
    const mainColor = mode === "optimization" ? waterLevelColor : demandColor;
    const subColor = mode === "optimization" ? pumpStroke : predictLineColor;

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
            else setHourStep(2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isNoData = useMemo(() => {
        if (!data || data.length === 0) return true;
        // first, second 중 하나라도 0이나 null이 아닌 값이 있으면 데이터가 있는 것으로 간주
        return data.every(item =>
            (!item.first || item.first === 0) &&
            (!item.second || item.second === 0)
        );
    }, [data]);

    if (isNoData) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted gap-2 bg-muted/5 rounded-2xl border border-dashed border-card-border min-h-37.5">
                <span className="text-sm font-medium">데이터가 없습니다.</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-1">
            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 0, right: mode === "prediction" ? -30 : -20, left: -30, bottom: -5 }}>
                        <defs>
                            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={mainColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={mainColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 8 }}
                            interval={0}
                            tickFormatter={(value) => {
                                if (!value) return "";
                                if (value.includes(":")) {
                                    const [h, m] = value.split(":").map(Number);
                                    return m === 0 && h % hourStep === 0 ? `${h}시` : "";
                                }
                                return value;
                            }}
                        />

                        <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: mainColor, fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                            tick={{ fill: subColor, fontSize: 10 }} domain={mode === "prediction" ? ["auto", "auto"] : [0, 4]} />

                        <Tooltip
                            cursor={{ stroke: isDark ? "#475569" : "#cbd5e1", strokeWidth: 1 }}
                            contentStyle={{
                                backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255,255,255,0.95)",
                                border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "10px",
                                fontSize: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                            labelStyle={{ color: isDark ? "#94a3b8" : "#64748b" }}
                            formatter={(value, name) => {
                                if (value === null || isNaN(Number(value))) return ["-", name];
                                const numValue = Number(value);
                                const unit = name === labels[0] ? units[0] : units[1];
                                return [`${numValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}${unit}`, name];
                            }}
                        />

                        {/* 가동 펌프 */}
                        {second && mode === "optimization" && (
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
                            <>
                                {mode === "optimization" ? (
                                    <Area
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="first"
                                        name={labels[0]}
                                        stroke={mainColor}
                                        strokeWidth={2}
                                        fill="url(#colorArea)"
                                        isAnimationActive={false}
                                        connectNulls
                                    />
                                ) : (
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
                            </>
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
                                <span className="text-[11px] font-medium text-muted">
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