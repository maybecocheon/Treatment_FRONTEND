'use client'

import { useState } from "react";
import { Calendar, Droplets, Filter, Gauge, Waves } from "lucide-react";
import Title from "@/components/main/Title";
import TailCategory from "@/components/main/TailCategory";
import TailChart from "@/components/main/TailChart";
import ChartBox from "@/components/main/ChartBox";

export default function History({ params }: { params: { id: string } }) {
    const { id } = params;
    const [selectedDate, setSelectedDate] = useState<string>("2023-01-06");

    return (
        <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* 헤더 영역 */}
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />

                {/* 날짜 */}
                <div className="glass p-2 rounded-3xl flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 max-w-full xl:max-w-60">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-100 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 필터 */}
            <TailCategory text="history" params={id} />

            {/* 메인 대시보드 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ChartBox
                    title={true ? '시간별 송수량 (Supply)' : '시간별 수위 변화 (Level)'}
                    icon={true ? Waves : Droplets}
                    textSize="text-[20px]"
                >
                    <TailChart
                        time={["1"]}
                        data={[1]}
                        label1="현재 수요"
                        label2="수요 예측"
                        label3="현재 수위"
                        label4="수위 예측"
                    />
                </ChartBox>
                <ChartBox
                    title={true ? '정수장 토출 압력 (Pressure)' : '시간별 유출량 (Outflow)'}
                    icon={Gauge}
                    color="text-green-700"
                    textSize="text-[20px]"
                >
                    <TailChart
                        time={["1"]}
                        data={[1]}
                        label1="현재 수요"
                        label2="수요 예측"
                        label3="현재 수위"
                        label4="수위 예측"
                    />
                </ChartBox>
            </div>
            {/* 그래프 3: 배수지별 총 수요량 비교 (Overview Only) */}
            {/* {isOverview && (
                    <div className="col-span-1 xl:col-span-2 glass p-8 rounded-[2.5rem]">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h4 className="text-xl font-black text-slate-800 tracking-tight">배수지별 총 수요량 비교</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated Demand Comparison</p>
                        </div>
                      </div>
                      <div className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={waterSystemDatas.filter(d => d.id.startsWith("res")).map(r => ({ name: r.name, value: r.actualDemand?.reduce((a, b) => a + b, 0) }))}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={60} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )} */}

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                {[
                    { label: '평균 수위/압력', value: id === '1' ? '6.2 bar' : '78.5%', change: '+2.4%' },
                    { label: '최고 유출/송수량', value: id === '1' ? '14,200 m³/h' : '650 m³/h', change: '-1.2%' },
                    { label: '일일 전력량', value: '1,240 kWh', change: 'Stable' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-5 md:p-6 rounded-4xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className="text-xl md:text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                            {stat.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
