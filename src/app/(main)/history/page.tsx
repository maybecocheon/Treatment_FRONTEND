'use client'

import RenderCharts from "@/app/(main)/history/RenderCharts";
import { selectedCategoryAtom } from "@/atoms/categoryAtom";
import Category from "@/components/main/TailCategory";
import Title from "@/components/main/Title";
import { useAtomValue, useSetAtom } from "jotai";
import { Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function History() {
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const setSeletedCategory = useSetAtom(selectedCategoryAtom);
  const [selectedDate, setSelectedDate] = useState<string>("2024-05-20");

  useEffect(() => {
    setSeletedCategory("OVERVIEW");
  }, []);
  
  return (
    <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* 헤더 영역 */}
        <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />

        {/* <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">데이터 추출 (CSV)</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
            보고서 생성
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div> */}

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
      <Category />

      {/* 메인 대시보드 */}
      <RenderCharts />

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        {[
          { label: '평균 수위/압력', value: selectedCategory === 'PLANT' ? '6.2 bar' : '78.5%', change: '+2.4%' },
          { label: '최고 유출/송수량', value: selectedCategory === 'PLANT' ? '14,200 m³/h' : '650 m³/h', change: '-1.2%' },
          { label: '에너지 효율 등급', value: 'A+', change: 'Stable' },
          { label: '이상 탐지 횟수', value: '0건', change: 'Normal' },
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
  );
}
