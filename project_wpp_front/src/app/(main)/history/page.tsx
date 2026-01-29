'use client'

import RenderCharts from "@/app/(main)/history/RenderCharts";
import Title from "@/components/main/Title";
import { ArrowUpRight, Calendar, Database, Download, Droplets, Filter } from "lucide-react";
import { useState } from "react";

export default function History() {
  const [selectedCategory, setSelectedCategory] = useState<string>('OVERVIEW');
  const [selectedDate, setSelectedDate] = useState<string>('2024-05-20');

  const categories = [
    { id: 'OVERVIEW', label: '전체', icon: <Database className="w-4 h-4" /> },
    { id: 'PLANT', label: '정수장', icon: <Database className="w-4 h-4" /> },
    { id: 'res-a', label: 'A 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-b', label: 'B 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-c', label: 'C 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-d', label: 'D 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-e', label: 'E 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-f', label: 'F 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-g', label: 'G 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-h', label: 'H 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-i', label: 'I 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-j', label: 'J 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-k', label: 'K 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-l', label: 'L 배수지', icon: <Droplets className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6">
        {/* 헤더 영역 */}
        <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">데이터 추출 (CSV)</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
            보고서 생성
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
        {/* 카테고리 */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="h-px xl:h-8 w-full xl:w-px bg-slate-200 mx-0 xl:mx-2" />

        {/* 날짜 */}
        <div className="flex items-center gap-4 flex-1">
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

      {/* 메인 대시보드 */}
      <RenderCharts selectedCategory={selectedCategory} />

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        {[
          { label: '평균 수위/압력', value: selectedCategory === 'PLANT' ? '6.2 bar' : '78.5%', change: '+2.4%' },
          { label: '최고 유출/송수량', value: selectedCategory === 'PLANT' ? '14,200 m³/h' : '650 m³/h', change: '-1.2%' },
          { label: '에너지 효율 등급', value: 'A+', change: 'Stable' },
          { label: '이상 탐지 횟수', value: '0건', change: 'Normal' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-4xl border border-slate-200 shadow-sm">
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
