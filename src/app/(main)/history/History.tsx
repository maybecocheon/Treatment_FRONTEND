'use client'

import { useEffect, useState } from "react";
import { Calendar, Database, Droplets, Filter, Gauge, Waves } from "lucide-react";
import Title from "@/components/main/Title";
import TailChart from "@/components/main/TailChart";
import ChartBox from "@/components/main/ChartBox";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import TailSelect from "@/components/TailSelect";
import { useFacilitiesData } from "@/hooks/useFacilitiesData";
import { useRouter } from "next/navigation";
import TailSelectSkeleton from "@/components/skeletons/TailSelectSkeleton";

export default function History({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();

    const { facilities, loadFacilities, isLoading: facilitiesLoading } = useFacilitiesData();

    const [selectedDate, setSelectedDate] = useState<string>("2023-01-06");
    const [selectedCategory, setSelectedCategory] = useState<string>(id);

    useEffect(() => {
        loadFacilities();
    }, [])

    useEffect(() => {
        router.push(`/history/${selectedCategory}`);
    }, [selectedCategory])

    return (
        <div className="flex flex-col h-full gap-4 md:p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* 헤더 영역 */}
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />


                <div className="glass p-2 rounded-3xl flex items-center gap-4 w-full md:w-auto">
                    {/* 카테고리 */}
                    <TailSelect
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        option=
                        {facilitiesLoading ? (
                            <option disabled>로딩중...</option>
                        ) : (
                            facilities.filter(f => f.type === "배수지" || f.type === "정수장" || f.type === "overview").map(f => <option key={f.facilityId} value={f.facilityId}>{f.name}</option>)
                        )} />
                    {/* 날짜 */}
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

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "평균 수위", value: "78.5%", change: '+2.4%' },
                    { label: '최고 수요량', value: "650 m³/h", change: '-1.2%' },
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

            {/* 메인 대시보드 */}
            <div className="flex-1 flex flex-col gap-4 w-full">
                {
                    selectedCategory !== "overview" ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1 mb-4 md:mb-0">
                            <ChartBox
                                title={selectedCategory === "1" ? "시간별 송수량" : "시간별 수위 변화"}
                                icon={selectedCategory === "1" ? Waves : Droplets}
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
                                title={selectedCategory === "1" ? "시간별 토출 압력" : "시간별 수요량"}
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
                    ) :
                        (// 그래프 3: 배수지별 총 수요량 비교
                            <div className="grid grid-cols-1 flex-1 mb-4 md:mb-0">
                                <ChartBox
                                    title="배수지별 총 수요량 비교"
                                    icon={Database}
                                    textSize="text-[20px]"
                                >
                                    <div className="w-full h-full relative">
                                        <ResponsiveContainer width="100%" height="100%" minHeight="100px">
                                            <BarChart data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                                                <YAxis stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={60} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </ChartBox>
                            </div>
                        )}
            </div>
        </div>
    )
}
