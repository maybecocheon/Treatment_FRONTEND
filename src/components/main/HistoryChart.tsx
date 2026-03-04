'use client'

import { useMemo } from "react";
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";


interface HistoryChartProps {
  data: any[];
  isTreatment?: boolean;
  isMonthly?: boolean;
  labels: string[];
}

export default function HistoryChart({ data, isTreatment = false, isMonthly, labels }: HistoryChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isNoData = useMemo(() => {
    if (!data || data.length === 0) return true;
    return data.every(item =>
      (!item.first || item.first === 0) &&
      (!item.second || item.second === 0)
    );
  }, [data]);

  if (isNoData) {
    return (
      <div className="w-full h-70 md:h-full flex flex-col items-center justify-center text-muted gap-2 bg-muted/5 rounded-2xl border border-dashed border-card-border min-h-[150px]">
        <span className="text-sm font-medium">데이터가 없습니다.</span>
      </div>
    );
  }

  // 유량(area) / 수위 (Cyan - Bright & Clean)
  const areaColor = isDark ? "#22d3ee" : "#0ea5e9";

  // 상태(Bar) / 압력 / 수요량
  const barColor = isTreatment
    ? (isDark ? "#10b981" : "#059669") // 압력 (Green)
    : (isDark ? "#818cf8" : "#3b82f6"); // 수요량 (Indigo in Dark, Blue in Light)

  // 단위
  const flowUnit = isTreatment ? " m³/h" : " m";
  const secondaryUnit = isTreatment ? " kgf/㎠" : " m³/h";

  // 범례
  const legendItems = [
    { label: labels[0], color: areaColor, type: "area" },
    { label: labels[1], color: barColor, type: "bar" }
  ];

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: -20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${isMonthly ? 'month' : 'day'}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={areaColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 11 }}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                if (!value) return "";
                if (isMonthly && value.includes("-")) return `${value.split("-").pop()}일` || value;
                if (!isMonthly && value.includes(":")) {
                  const [h, m] = value.split(":").map(Number);
                  return m === 0 ? `${h}시` : "";
                }
                return value;
              }}
            />

            <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: areaColor, fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: barColor, fontSize: 10 }} domain={["auto", "auto"]} />

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
                const numValue = Number(value);
                const unit = name === labels[0] ? flowUnit : secondaryUnit;
                return [`${numValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}${unit}`, name];
              }}
            />

            <Bar
              yAxisId="right"
              dataKey="second"
              name={labels[1]}
              fill={barColor}
              radius={[4, 4, 0, 0]}
              barSize={isMonthly ? 15 : 8}
              opacity={0.7}
            />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="first"
              name={labels[0]}
              stroke={areaColor}
              strokeWidth={2}
              fill={`url(#gradient-${isMonthly ? "month" : "day"})`}
              isAnimationActive={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 범례 영역 */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {legendItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 group cursor-default">
            <div className="relative flex items-center justify-center">
              {item.type === "area" ? (
                // Area 아이콘
                <div className="flex flex-col items-center">
                  <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="w-4 h-1.5 opacity-30 mt-0.5 rounded-b-sm" style={{ backgroundColor: item.color }} />
                </div>
              ) : (
                // Bar 아이콘
                <div className="w-2.5 h-3.5 rounded-xs" style={{ backgroundColor: item.color, opacity: 0.8 }} />
              )}
            </div>

            {/* 레이블 텍스트 */}
            <span className="text-[11px] text-muted">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
