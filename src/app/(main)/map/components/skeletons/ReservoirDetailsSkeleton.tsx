'use client'

import { X, Droplets, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReservoirDetailsSkeleton() {
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-6">
            <div className="bg-white/60 rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col">

                {/* 헤더 스켈레톤 */}
                <div className="px-6 py-5 md:px-10 md:py-8 flex justify-between items-center bg-sky-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-slate-200 animate-pulse">
                            <Droplets className="text-slate-300 w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-7 w-48 bg-slate-200 rounded-lg animate-pulse" />
                            <div className="h-4 w-64 bg-slate-200 rounded-md animate-pulse" />
                        </div>
                    </div>
                    <div className="p-2.5 rounded-xl animate-pulse group hover:bg-slate-300" onClick={() => router.back()}>
                        <X size={24} className="text-slate-600 hover:text-white" />
                    </div>
                </div>

                {/* 컨텐츠 영역 스켈레톤 */}
                <div className="p-6 md:p-10 overflow-y-auto bg-slate-50/30 space-y-10">

                    {/* 상단 요약 카드 2개 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="h-32 bg-white/40 border border-slate-100 rounded-3xl animate-pulse p-6 space-y-4">
                            <div className="h-3 w-20 bg-slate-200 rounded" />
                            <div className="h-10 w-40 bg-slate-200 rounded-lg" />
                        </div>
                        <div className="h-32 bg-white/40 border border-slate-100 rounded-3xl animate-pulse p-6 space-y-4">
                            <div className="h-3 w-20 bg-slate-200 rounded" />
                            <div className="h-10 w-full bg-slate-200 rounded-lg" />
                        </div>
                    </div>

                    {/* 메인 차트 영역 스켈레톤 */}
                    <div className="bg-white/40 border border-slate-100 rounded-4xl p-8">
                        <div className="flex justify-between mb-8">
                            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
                            <div className="flex gap-2">
                                <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                                <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                            </div>
                        </div>
                        {/* 차트 모사물 */}
                        <div className="h-80 w-full bg-slate-100/50 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 flex items-end justify-around p-4">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-1 bg-slate-200 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 중앙 로딩 오버레이 */}
                    <div className="absolute inset-0 z-100 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl text-slate-200 backdrop-blur">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                            <span className="text-sm font-medium">데이터를 불러오는 중이에요…</span>
                        </div>
                    </div>

                    {/* 하단 버튼 가이드 스켈레톤 */}
                    {/* <div className="h-32 w-full bg-slate-200/50 rounded-[2.5rem] animate-pulse" /> */}
                </div>
            </div>
        </div>
    );
}