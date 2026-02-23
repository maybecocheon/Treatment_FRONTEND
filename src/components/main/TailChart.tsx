import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface TailChartProps {
  data: any[];
  isTreatment: boolean;
  isMonthly?: boolean;
  labels: string[];
}

export default function TailChart({ data, isTreatment, isMonthly, labels }: TailChartProps) {
  // 유량(area)
  const areaColor = isMonthly ? "#22d3ee" : "#3b82f6";
  // 상태(Bar)
  const barColor = isTreatment ? "#10b981" : (isMonthly ? "#0891b2" : "#36bad1");

  // 단위
  const flowUnit = " m³/h";
  const secondaryUnit = isTreatment ? " kgf/㎠" : " m";

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

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d8dde3" />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
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
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              formatter={(value, name) => {
                const numValue = Number(value);
                const unit = name === labels[0] ? flowUnit : secondaryUnit;
                return [`${numValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}${unit}`, name];
              }}
            />

            <Bar
              yAxisId="right"
              dataKey="secondary"
              name={labels[1]}
              fill={barColor}
              radius={[4, 4, 0, 0]}
              barSize={isMonthly ? 15 : 8}
              opacity={0.7}
            />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="flow"
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
            <span className="text-[11px] text-slate-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
