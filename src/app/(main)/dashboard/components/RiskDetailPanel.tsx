'use client'

import { PieChart, Pie, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";
import { useTheme } from "next-themes";

export default function RiskDetailPanel({ riskMetrics }: { riskMetrics: { totalScore: number; dangerCount: number; treatmentFine: boolean; } }) {
  const { totalScore, dangerCount, treatmentFine } = riskMetrics;
  const isDanger = totalScore < 80;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex-1">
      <div className="bg-card backdrop-blur-sm border border-card-border rounded-2xl p-3 lg:p-4 h-full flex flex-col transition-all">

        <div className="flex items-center gap-2 mb-3 shrink-0">
          <div className="w-1.5 h-3 bg-danger rounded-full"></div>
          <h2 className="text-xs lg:text-sm font-bold text-foreground">운영 리스크 가중치</h2>
        </div>

        <div className="flex-1 flex flex-col min-h-0 gap-4">
          {/* 파이 차트 */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-25">
            <ResponsiveContainer width="100%" height="100%" minHeight={100}>
              <PieChart>
                <Pie
                  data={[
                    { value: totalScore, fill: totalScore > 80 ? "var(--success)" : "var(--danger)" },
                    { value: 100 - totalScore, fill: "var(--card-border)" }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-xl font-black ${isDanger ? "text-danger" : "text-success"} leading-none`}>{totalScore}</span>
              <span className="text-[8px] text-muted uppercase font-bold mt-1">Score</span>
            </div>
          </div>

          {/* 바 차트 */}
          <div className="flex-[1.5] flex flex-col justify-center">
            {[
              { name: "배수지 수위", value: dangerCount * 6, max: 72, label: `${dangerCount}개소`, fill: "var(--danger)" },
              { name: "정수장 압력", value: treatmentFine ? 0 : 28, max: 28, label: treatmentFine ? "정상" : "이상", fill: "var(--warning)" }
            ].map((item) => (
              <div key={item.name} className="h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[item]}
                    margin={{ top: -20, right: 45, left: 0, bottom: -20 }}
                  >
                    <XAxis type="number" hide domain={[0, item.max]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke={isDark ? "#94a3b8" : "#64748b"}
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Bar
                      dataKey="value"
                      radius={[0, 4, 4, 0]}
                      barSize={8}
                      background={{ fill: "var(--subtle-border)" }}
                      isAnimationActive={false}
                    >
                      <LabelList
                        dataKey="label"
                        position="right"
                        style={{ fontSize: '10px', fontWeight: 'bold', fill: isDark ? "#94a3b8" : "#64748b" }}
                        offset={10}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* 결과 요약 뱃지 스타일 */}
          <div className={`mt-3 px-3 py-1.5 rounded-lg border border-card-border/50 ${isDanger ? "bg-danger-bg text-danger" : "bg-success-bg text-success"}`}>
            <p className="text-[10px] font-medium">
              <span className="font-bold mr-1">● 분석 결과:</span>
              {
                isDanger
                  ? treatmentFine ?
                    `현재 ${dangerCount}개 배수지에서 수위 위험이 감지되었습니다.`
                    : "정수장 공급 압력을 확인하십시오."
                  : "시설의 공급 및 수위 상태가 매우 양호합니다."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};