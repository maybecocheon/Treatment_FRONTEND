'use client'

import { Calendar, Filter } from "lucide-react";
import Title from "@/components/main/Title";

export default function HistorySkeleton() {
    return (
        <div className="flex flex-col h-full gap-4 md:p-4 animate-pulse">
            {/* 헤더 영역 스켈레톤 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Title title="히스토리 뷰어" subtitle="과거 운영 데이터 분석 및 리포트 조회" />

                <div className="glass p-2 rounded-3xl flex items-center gap-4 w-full md:w-auto">
                    {/* 카테고리 셀렉트 스켈레톤 */}
                    <div className="h-10 w-32 bg-slate-200 rounded-2xl"></div>
                    
                    {/* 날짜 입력 스켈레톤 */}
                    <div className="relative flex-1 max-w-full xl:max-w-60">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <div className="w-full h-10 bg-slate-100 rounded-2xl py-2.5"></div>
                    </div>
                    
                    {/* 필터 버튼 스켈레톤 */}
                    <div className="p-3 bg-slate-100 border border-slate-50 rounded-2xl">
                        <Filter className="w-4 h-4 text-slate-300" />
                    </div>
                </div>
            </div>

            {/* Stats Summary 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass p-5 md:p-6 rounded-4xl">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-3"></div>
                        <div className="h-8 w-24 bg-slate-300 rounded mb-2"></div>
                        <div className="h-4 w-12 bg-slate-100 rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* 메인 차트 영역 스켈레톤 */}
            <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1 mb-4 md:mb-0">
                    {[1, 2].map((i) => (
                        <div key={i} className="glass p-6 rounded-4xl flex flex-col gap-4 h-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg w-10 h-10"></div>
                                <div className="h-6 w-40 bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex-1 w-full bg-slate-50 rounded-3xl border border-slate-100 flex items-end justify-around p-6">
                                {/* 가짜 차트 막대들 */}
                                {[40, 70, 45, 90, 65, 80].map((h, idx) => (
                                    <div key={idx} style={{ height: `${h}%` }} className="w-8 bg-slate-200 rounded-t-lg"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}